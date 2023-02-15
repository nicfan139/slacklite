import { ChannelResolvers } from './channel';
import { MessageResolvers } from './message';
import { PreferenceResolvers } from './preference';
import { UserResolvers } from './user';

export const resolvers = [ChannelResolvers, MessageResolvers, PreferenceResolvers, UserResolvers];
