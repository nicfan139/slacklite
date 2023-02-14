import { AppDataSource } from '../typeOrm';
import { Channel } from '../entity/Channel';
import { Message } from '../entity/Message';
import { User } from '../entity/User';

export const ChannelRepository = AppDataSource.getRepository(Channel);
export const MessageRepository = AppDataSource.getRepository(Message);
export const UserRepository = AppDataSource.getRepository(User);
