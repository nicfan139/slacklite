import { ChannelResolvers } from './channel';
import { MessageResolvers } from './message';
import { UserResolvers } from './user';

export const resolvers = [ChannelResolvers, MessageResolvers, UserResolvers];
