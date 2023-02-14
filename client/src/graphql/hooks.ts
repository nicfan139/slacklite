import { useQuery, useMutation } from '@apollo/client';
import { getAuthContext } from '@/helpers';
import { TChannel, TMessage } from '@/types';
import { CHANNEL_QUERY } from './queries';
import { ADD_MESSAGE_MUTATION } from './mutations';
import { IAddMessageInput } from './types';

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
