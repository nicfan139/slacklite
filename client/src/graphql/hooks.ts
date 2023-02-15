import { useQuery, useMutation } from '@apollo/client';
import { getAuthContext } from '@/helpers';
import { TChannel, TMessage, TUser } from '@/types';
import { USERS_QUERY, USER_QUERY, CHANNEL_QUERY } from './queries';
import {
	UPDATE_USER_MUTATION,
	UPDATE_USER_PASSWORD_MUTATION,
	ADD_CHANNEL_MUTATION,
	ADD_MESSAGE_MUTATION
} from './mutations';
import {
	IUpdateUserInput,
	IUpdatePasswordInput,
	IAddChannelInput,
	IAddMessageInput
} from './types';

export const useUsersQuery = () => {
	const { data, loading } = useQuery<{ users: Array<TUser> }>(USERS_QUERY, {
		context: getAuthContext()
	});

	return {
		isLoading: loading,
		users: data?.users
	};
};

export const useUserQuery = (userId?: string) => {
	if (userId) {
		const { data, loading } = useQuery<{ user: TUser }>(USER_QUERY, {
			context: getAuthContext(),
			variables: {
				userId
			}
		});

		return {
			isLoading: loading,
			user: data?.user
		};
	}

	return {
		isLoading: false,
		user: null
	};
};

export const useUserUpdateMutation = () => {
	const [mutate, { loading }] = useMutation(UPDATE_USER_MUTATION);

	return {
		isLoading: loading,
		updateUser: async (userId: string, input: IUpdateUserInput) => {
			const {
				data: { user }
			} = await mutate({
				variables: { userId, input },
				context: getAuthContext(),
				refetchQueries: [
					{
						query: USER_QUERY,
						variables: {
							userId
						},
						context: getAuthContext()
					}
				]
			});
			return user as TUser;
		}
	};
};

export const useUserUpdatePasswordMutation = () => {
	const [mutate, { loading }] = useMutation(UPDATE_USER_PASSWORD_MUTATION);

	return {
		isLoading: loading,
		updatePassword: async (input: IUpdatePasswordInput) => {
			const {
				data: { user }
			} = await mutate({
				variables: { input },
				context: getAuthContext()
			});
			return user as TUser;
		}
	};
};

export const useChannelQuery = (channelId?: string) => {
	if (channelId) {
		const { data, loading } = useQuery<{ channel: TChannel }>(CHANNEL_QUERY, {
			context: getAuthContext(),
			variables: {
				channelId
			}
		});

		return {
			isLoading: loading,
			channel: data?.channel
		};
	}

	return {
		isLoading: false,
		channel: null
	};
};

export const useAddChannelMutation = () => {
	const [mutate, { loading }] = useMutation(ADD_CHANNEL_MUTATION);

	return {
		isLoading: loading,
		addChannel: async (input: IAddChannelInput) => {
			const {
				data: { channel }
			} = await mutate({
				variables: { input },
				context: getAuthContext(),
				refetchQueries: [
					{
						query: USER_QUERY,
						variables: {
							userId: input.ownerId
						},
						context: getAuthContext()
					}
				]
			});
			return channel as TChannel;
		}
	};
};

export const useAddMessageMutation = () => {
	const [mutate, { loading }] = useMutation(ADD_MESSAGE_MUTATION);

	return {
		isLoading: loading,
		addMessage: async (input: IAddMessageInput) => {
			const {
				data: { message }
			} = await mutate({
				variables: { input },
				context: getAuthContext(),
				refetchQueries: [
					{
						query: CHANNEL_QUERY,
						variables: {
							channelId: input.channelId
						},
						context: getAuthContext()
					}
				]
			});
			return message as TMessage;
		}
	};
};
