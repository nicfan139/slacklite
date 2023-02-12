import { GraphQLError } from 'graphql';
import { AppDataSource } from '../typeOrm';
import { Channel } from '../entity/Channel';
import { Message } from '../entity/Message';
import { User } from '../entity/User';
import { pubSub } from './helpers';

const ChannelRepository = AppDataSource.getRepository(Channel);
const MessageRepository = AppDataSource.getRepository(Message);
const UserRepository = AppDataSource.getRepository(User);

interface IChannelPayload {
	name: string;
	description?: string;
	ownerId: string;
	members: string[];
}

export const ChannelResolvers = {
	Query: {
		channels: async () => {
			const channels = await ChannelRepository.find({
				relations: ['owner', 'members', 'messages', 'messages.from'],
				order: {
					createdAt: 'DESC',
					messages: {
						createdAt: 'DESC'
					}
				}
			});
			return channels;
		},

		channel: async (
			_root: unknown,
			args: {
				channelId: string;
			}
		) => {
			const channel = await ChannelRepository.findOne({
				where: {
					id: args.channelId
				},
				relations: ['owner', 'members', 'messages', 'messages.from'],
				order: {
					messages: {
						createdAt: 'DESC'
					}
				}
			});

			console.log(channel);

			if (channel) {
				return channel;
			} else {
				throw new GraphQLError(`Channel #${args.channelId} does not exist`);
			}
		}
	},

	Mutation: {
		addChannel: async (
			_root: unknown,
			args: {
				input: IChannelPayload;
			}
		) => {
			const owner = await UserRepository.findOneBy({
				id: args.input.ownerId
			});

			const members: User[] = await Promise.all(
				args.input.members.map(async (userId: string) => {
					const user = await UserRepository.findOneBy({ id: userId });
					return user as User;
				})
			);

			const payload = {
				...args.input,
				owner: owner as User,
				members
			};

			const channel = await ChannelRepository.create(payload);
			const result = await ChannelRepository.save(channel);

			pubSub.publish('CHANNEL_ADDED', {
				channelAdded: result
			});

			return result;
		},

		updateChannel: async (
			_root: unknown,
			args: {
				channelId: string;
				input: IChannelPayload;
			}
		) => {
			const members: User[] = await Promise.all(
				args.input.members.map(async (userId: string) => {
					const user = await UserRepository.findOneBy({ id: userId });
					return user as User;
				})
			);

			const channel = await ChannelRepository.findOneBy({ id: args.channelId });

			if (channel) {
				const payload = {
					...args.input,
					members
				};
				const updatedChannel = ChannelRepository.merge(channel, payload);
				const result = await ChannelRepository.save(updatedChannel);

				pubSub.publish('CHANNEL_UPDATED', {
					channelUpdated: result
				});

				return result;
			} else {
				throw new GraphQLError(`Channel #${args.channelId} does not exist`);
			}
		},

		deleteChannel: async (
			_root: unknown,
			args: {
				channelId: string;
			}
		) => {
			const CHANNEL_ID_TO_DELETE = args.channelId;
			const channel = await ChannelRepository.findOne({
				where: {
					id: CHANNEL_ID_TO_DELETE
				},
				relations: ['messages', 'members', 'members.channels']
			});

			if (channel) {
				// Delete all channel messages
				await Promise.all(
					channel.messages.map(async (message) => {
						await MessageRepository.delete(message.id);
					})
				);

				// Dissociate channel from each affected channel member (user)
				await Promise.all(
					channel.members.map(async (member) => {
						member.channels = member.channels.filter(
							(channel) => channel.id !== CHANNEL_ID_TO_DELETE
						);
						await UserRepository.save(member);
					})
				);

				// Delete the channel after dissociating the users
				await ChannelRepository.delete(CHANNEL_ID_TO_DELETE);

				pubSub.publish('CHANNEL_DELETED', {
					channelDeletedId: CHANNEL_ID_TO_DELETE
				});

				return `Successfully deleted channel #${CHANNEL_ID_TO_DELETE}`;
			} else {
				throw new GraphQLError(`Channel #${CHANNEL_ID_TO_DELETE} does not exist`);
			}
		}
	}
};
