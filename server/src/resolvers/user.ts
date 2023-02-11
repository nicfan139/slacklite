import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { AppDataSource } from '../typeOrm';
import { User } from '../entity/User';

dotenv.config();

const UserRepository = AppDataSource.getRepository(User);

interface IUserCreatePayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	isAdmin: boolean;
}

export const UserResolvers = {
	Query: {
		users: async () => {
			const users = await UserRepository.find();
			return users;
		}
	},

	Mutation: {
		addUser: async (
			_root: unknown,
			args: {
				input: IUserCreatePayload;
			}
		) => {
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

		deleteUser: async (
			_root: unknown,
			args: {
				userId: string;
			}
		) => {
			await UserRepository.delete(args.userId);
			return `Successfully deleted user #${args.userId}`;
		}
	},

	User: {}
};
