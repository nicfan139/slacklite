export type TEntity = {
	id: string;
	createdAt: string;
	updatedAt: string;
};

export type TUser = TEntity & {
	email: string;
	firstName: string;
	lastName: string;
	isAdmin: boolean;
	channels: Array<TUserChannel>;
	channelsOwned: Array<TUserChannel>;
};

export type TChannel = TEntity & {
	name: string;
	description: string;
	owner: TUser;
	messages: Array<TMessage>;
};

export type TUserChannel = Omit<TChannel, 'owner' | 'messages'>;

export type TMessage = TEntity & {
	text: string;
	from: TUser;
	channel: TChannel;
}