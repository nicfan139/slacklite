import { GraphQLError } from 'graphql';
import { PreferenceRepository } from './helpers';

export const PreferenceResolvers = {
	Query: {
		preferences: async (
			_root: unknown,
			_args: unknown,
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			const preferences = await PreferenceRepository.find({
				order: {
					createdAt: 'DESC'
				},
				relations: {
					user: true
				}
			});

			return preferences;
		},

		preference: async (
			_root: unknown,
			args: {
				preferenceId: string;
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			const preference = await PreferenceRepository.findOne({
				where: {
					id: args.preferenceId
				},
				relations: {
					user: true
				}
			});

			if (preference) {
				return preference;
			} else {
				throw new GraphQLError(`Preference #${args.preferenceId} does not exist`);
			}
		}
	},

	Mutation: {
		updatePreference: async (
			_root: unknown,
			args: {
				preferenceId: string;
				input: {
					colorScheme: string;
					darkModeEnabled: boolean;
					chatNameDisplay: string;
				};
			},
			context: {
				id: string;
			}
		) => {
			if (!context.id) {
				throw new GraphQLError('Unauthorized');
			}

			const preference = await PreferenceRepository.findOneBy({
				id: args.preferenceId
			});

			if (preference) {
				PreferenceRepository.merge(preference, args.input);
				const updatedPreferencce = await PreferenceRepository.save(preference);
				return updatedPreferencce;
			} else {
				throw new GraphQLError(`Preference #${args.preferenceId} does not exist`);
			}
		}
	}
};
