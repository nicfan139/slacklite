'use client';
import { createContext, ReactNode, useState, useEffect, useCallback, useContext } from 'react';
import { LoadingScreen } from '@/components';
import { PUBLIC_ROUTES } from '@/constants';
import { useNotificationContext } from './NotificationContext';
import { USER_ACCESS_TOKEN, EMAIL_VERIFY_TOKEN } from '@/helpers';
import { useValidateToken, useVerifyEmail } from '@/hooks';
import { TUser } from '@/types';

interface IUserContext {
	currentUser: TUser | null;
	setCurrentUser: (user: TUser) => void;
}

const UserContext = createContext<IUserContext>({
	currentUser: null,
	setCurrentUser: () => {}
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
	const { showNotification } = useNotificationContext();
	const validateToken = useValidateToken();
	const verifyEmail = useVerifyEmail();

	const [currentUser, setCurrentUser] = useState<TUser | null>(null);

	const redirectToLogin = useCallback(() => {
		if (typeof window !== 'undefined') {
			window.location.href = '/login';
		}
	}, []);

	const validateUserToken = async (token: string) => {
		const { status, data } = await validateToken.mutateAsync(token);
		if (status === 200 && data.isTokenValid && data.user) {
			setCurrentUser(data.user);
		} else if (!data.isTokenValid) {
			if (typeof window !== 'undefined') {
				localStorage.removeItem('slacklite-userAccessToken');
			}
			redirectToLogin();
		}
	};

	const validateUserEmail = async (accessToken: string, verifyToken: string) => {
		const { status, data } = await verifyEmail.mutateAsync({
			accessToken,
			verifyToken
		});
		if (status === 201 && data.isTokenValid && data.user) {
			showNotification({
				title: 'Email successfully verified!',
				type: 'success'
			});
			setCurrentUser(data.user);
		} else if (!data.isTokenValid) {
			if (typeof window !== 'undefined') {
				localStorage.removeItem('slacklite-userAccessToken');
			}
			redirectToLogin();
		}
	};

	useEffect(() => {
		const existingToken = USER_ACCESS_TOKEN;

		if (!existingToken) {
			if (!PUBLIC_ROUTES.includes(window.location.pathname)) {
				redirectToLogin();
			}
		} else {
			if (EMAIL_VERIFY_TOKEN) {
				validateUserEmail(existingToken, EMAIL_VERIFY_TOKEN);
			} else {
				validateUserToken(existingToken);
			}
		}
	}, []);

	if (validateToken.isLoading || verifyEmail.isLoading) {
		return <LoadingScreen message="Validating credentials" />;
	}

	return (
		<UserContext.Provider
			value={{
				currentUser,
				setCurrentUser
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
