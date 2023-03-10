import { GraphQLError } from 'graphql';
import { ChannelRepository, MessageRepository, UserRepository } from './helpers';

export const MessageResolvers = {
	Query: {
		messages: async (
			_root: unknown,
			_args: unknown,
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			const messages = await MessageRepository.find({
				relations: {
					from: true,
					channel: true
				}
			});
			return messages;
		}
	},

	Mutation: {
		addMessage: async (
			_root: unknown,
			args: {
				input: {
					channelId: string;
					senderId: string;
					text: string;
				};
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
					id: args.input.channelId
				},
				relations: {
					members: true
				}
			});

			const sender = await UserRepository.findOneBy({
				id: args.input.senderId
			});

			if (channel && sender) {
				const IS_CHANNEL_MEMBER = channel.members.find(
					(member) => member.id === args.input.senderId
				);

				if (IS_CHANNEL_MEMBER) {
					const payload = {
						text: args.input.text,
						channel,
						from: sender
					};
					const newMessage = await MessageRepository.create(payload);
					const result = await MessageRepository.save(newMessage);

					return result;
				} else {
					throw new GraphQLError(
						`User #${args.input.senderId} is not a member of channel #${args.input.channelId}`
					);
				}
			} else {
				throw new GraphQLError(`Error occured while trying to create new message`);
			}
		},

		updateMessage: async (
			_root: unknown,
			args: {
				messageId: string;
				text: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			const message = await MessageRepository.findOne({
				where: {
					id: args.messageId
				},
				relations: {
					channel: true,
					from: true
				}
			});

			if (message) {
				const payload = {
					...message,
					text: args.text
				};
				const updatedMessage = MessageRepository.merge(message, payload);
				const result = MessageRepository.save(updatedMessage);

				return result;
			} else {
				throw new GraphQLError(`Message #${args.messageId} does not exist`);
			}
		},

		deleteMessage: async (
			_root: unknown,
			args: {
				messageId: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			await MessageRepository.delete(args.messageId);

			return `Successfully deleted message #${args.messageId}`;
		}
	}
};
