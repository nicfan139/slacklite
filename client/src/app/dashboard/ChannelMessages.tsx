import dayjs from 'dayjs'
import { Loading } from '@/components';
import { useChannelQuery } from '@/graphql';

interface IChannelMessagesProps {
  selectedChannelId?: string;
}

const ChannelMessages = ({
  selectedChannelId,
}: IChannelMessagesProps): React.ReactElement => {
  const { isLoading, channel } = useChannelQuery(selectedChannelId);
  return (
    <div className='w-full p-8 bg-white'>
      {selectedChannelId && channel ? (
        <>
          {channel.messages.length > 0 ? channel.messages.map(message => (
            <div className="w-full flex justify-between my-2">
              <div>
                <label className="font-bold">
                  {message.from.firstName} {message.from.lastName}
                </label>
                <p>
                  {message.text}
                </p>
              </div>
              
              <label>
                {dayjs(message.createdAt).format('YYYY-MM-DD hh:mm A')}
              </label>
            </div>
          )) : (
            <label>
              No messages to display. Feel free to start this conversation!
            </label>
          )}
        </>
      ) : (
        <>
          {isLoading ? <Loading className="h-20 w-20" /> : (
            <label>Select a channel to get started!</label>
          )}
        </>
      )}
    </div>
  )
}

export default ChannelMessages;