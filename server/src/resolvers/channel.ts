import { GraphQLError } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { AppDataSource } from '../typeOrm';
import { Channel } from '../entity/Channel';
import { User } from '../entity/User';

const pubSub = new PubSub();

const ChannelRepository = AppDataSource.getRepository(Channel);
const UserRepository = AppDataSource.getRepository(User);

interface IChannelPayload {
	name: string;
	description?: string;
	members: string[];
}

export const ChannelResolvers = {
	Query: {
		channels: async () => {
			const channels = await ChannelRepository.find({
				relations: {
					members: true
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
				relations: {
					members: true
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
			}
		) => {
			const members: User[] = await Promise.all(
				args.input.members.map(async (userId: string) => {
					const user = await UserRepository.findOneBy({ id: userId });
					return user as User;
				})
			);

			const payload = {
				...args.input,
				members
			};

			const channel = await ChannelRepository.create(payload);
			const result = await ChannelRepository.save(channel);

			pubSub.publish('CHANNEL_ADDED', {
				channelAdded: channel
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
				relations: {
					members: true
				}
			});

			if (channel) {
				// Dissociate channel from each affected channel member (user)
				await Promise.all(
					channel.members.map(async (member) => {
						const user = await UserRepository.findOne({
							where: {
								id: member.id
							},
							relations: {
								channels: true
							}
						});
						console.log(user);
						if (user) {
							user.channels = user.channels.filter(
								(channel) => channel.id !== CHANNEL_ID_TO_DELETE
							);
							UserRepository.save(user);
						} else {
							throw new GraphQLError(
								`Unable to dissociate members from channel #${CHANNEL_ID_TO_DELETE}`
							);
						}
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
