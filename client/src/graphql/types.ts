export interface IUpdateUserInput {
	firstName: string;
	lastName: string;
	email: string;
}

export interface IAddChannelInput {
	name: string;
	description?: string;
	ownerId: string;
	members: Array<string>;
}

export interface IAddMessageInput {
	channelId: string;
	senderId: string;
	text: string;
}
