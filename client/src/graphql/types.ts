import { TPreferencesChatNameDisplay, TPreferencesColorScheme } from '@/types';

export interface IUpdateUserInput {
	firstName: string;
	lastName: string;
	email: string;
	isAdmin?: boolean;
	verified?: boolean;
}

export interface IUpdatePreferenceInput {
	colorScheme: TPreferencesColorScheme;
	darkModeEnabled: boolean;
	chatNameDisplay: TPreferencesChatNameDisplay;
}

export interface IUpdatePasswordInput {
	currentPassword: string;
	newPassword: string;
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
