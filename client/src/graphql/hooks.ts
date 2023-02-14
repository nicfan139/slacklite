import { useQuery } from '@apollo/client';
import { USER_ACCESS_TOKEN } from '@/helpers';
import { CHANNEL_QUERY } from './queries';
import { TChannel } from '@/types';

export const useChannelQuery = (channelId?: string) => {
  if (channelId) {
    const { data, loading } = useQuery<{ channel: TChannel }>(CHANNEL_QUERY, {
      context: {
        headers: {
          'Authorization': `Bearer ${USER_ACCESS_TOKEN}`
        },
      },
      variables: {
        channelId
      }
    })
    
    return {
      isLoading: loading,
      channel: data?.channel
    }
  }

  return {
    isLoading: false,
    channel: null,
  }
}