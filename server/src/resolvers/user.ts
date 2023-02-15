import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { UserRepository } from './helpers';

dotenv.config();

interface IUserPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	isAdmin: boolean;
}

export const UserResolvers = {
	Query: {
		users: async (
			_root: unknown,
			_args: unknown,
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			const users = await UserRepository.find({
				order: {
					createdAt: 'DESC'
				}
			});
			return users;
		},

		user: async (
			_root: unknown,
			args: {
				userId: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			const user = await UserRepository.findOne({
				where: {
					id: args.userId
				},
				relations: {
					channels: true,
					channelsOwned: true
				},
				order: {
					channels: {
						name: 'ASC'
					}
				}
			});

			if (user) {
				return user;
			} else {
				throw new GraphQLError(`User #${args.userId} does not exist`);
			}
		}
	},

	Mutation: {
		addUser: async (
			_root: unknown,
			args: {
				input: IUserPayload;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;
			const hashedPassword = await bcrypt.hash(args.input.password, Number(BCRYPT_SALT_ROUNDS));
			if (hashedPassword) {
				const payload = {
					...args.input,
					password: hashedPassword
				};
				const user = await UserRepository.create(payload);
				const result = await UserRepository.save(user);
				return result;
			} else {
				throw new GraphQLError('Unable to encrypt password');
			}
		},

		updateUser: async (
			_root: unknown,
			args: {
				userId: string;
				input: IUserPayload;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			const user = await UserRepository.findOneBy({
				id: args.userId
			});

			if (user) {
				UserRepository.merge(user, args.input);
				const updatedUser = await UserRepository.save(user);
				return updatedUser;
			} else {
				throw new GraphQLError(`User #${args.userId} does not exist`);
			}
		},

		deleteUser: async (
			_root: unknown,
			args: {
				userId: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			await UserRepository.delete(args.userId);
			return `Successfully deleted user #${args.userId}`;
		}
	}
};
