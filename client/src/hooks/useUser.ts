import { useMutation } from 'react-query';
import { normalFetch } from '@/helpers';
import { TUser, IFetchResponse } from '@/types';

type TUseUserLoginData = {
	accessToken: string;
	user: TUser;
	errorMessage: string;
};

export const useUserLogin = () =>
	useMutation(async (payload: { email: string; password: string }) => {
		const response = await normalFetch({ route: '/auth/login', method: 'POST', payload });

		return {
			status: response.status,
			data: await response.json()
		} as IFetchResponse<TUseUserLoginData>;
	});

type TUseValidateTokenData = {
	isTokenValid: boolean;
	user: TUser;
	errorMessage: string;
};

export const useValidateToken = () =>
	useMutation(async (token: string) => {
		const response = await normalFetch({
			route: '/auth/validate_token',
			method: 'POST',
			payload: { token }
		});

		return {
			status: response.status,
			data: await response.json()
		} as IFetchResponse<TUseValidateTokenData>;
	});

interface IUserCreatePayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const useUserCreate = () =>
	useMutation(async (payload: IUserCreatePayload) => {
		const response = await normalFetch({
			route: '/users/register',
			method: 'POST',
			payload
		});

		return {
			status: response.status
		};
	});
