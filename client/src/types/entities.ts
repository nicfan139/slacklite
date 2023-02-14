export type TEntity = {
	id: string;
	createdAt: string;
	updatedAt: string;
};

export type TChannel = TEntity & {
	name: string;
	description: string;
	owner: TUser;
	messages: Array<{}>;
};

export type TUser = TEntity & {
	email: string;
	firstName: string;
	lastName: string;
	isAdmin: boolean;
	channels: Array<Omit<TChannel, 'owner' | 'messages'>>;
	channelsOwned: Array<Omit<TChannel, 'owner' | 'messages'>>;
};
