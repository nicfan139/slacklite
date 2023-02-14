import { GraphQLError } from 'graphql';
import { User } from '../entity/User';
import { ChannelRepository, MessageRepository, UserRepository } from './helpers';

interface IChannelPayload {
	name: string;
	description?: string;
	ownerId: string;
	members: string[];
}

export const ChannelResolvers = {
	Query: {
		channels: async (
			_root: unknown,
			_args: unknown,
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			const channels = await ChannelRepository.find({
				relations: ['owner', 'members', 'messages', 'messages.from'],
				order: {
					createdAt: 'DESC',
					messages: {
						createdAt: 'ASC'
					}
				}
			});
			return channels;
		},

		channel: async (
			_root: unknown,
			args: {
				channelId: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			const channel = await ChannelRepository.findOne({
				where: {
					id: args.channelId
				},
				relations: ['owner', 'members', 'messages', 'messages.from'],
				order: {
					messages: {
						createdAt: 'ASC'
					}
				}
			});

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
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

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

			return result;
		},

		updateChannel: async (
			_root: unknown,
			args: {
				channelId: string;
				input: IChannelPayload;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

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

				return result;
			} else {
				throw new GraphQLError(`Channel #${args.channelId} does not exist`);
			}
		},

		deleteChannel: async (
			_root: unknown,
			args: {
				channelId: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

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

				return `Successfully deleted channel #${CHANNEL_ID_TO_DELETE}`;
			} else {
				throw new GraphQLError(`Channel #${CHANNEL_ID_TO_DELETE} does not exist`);
			}
		}
	}
};
