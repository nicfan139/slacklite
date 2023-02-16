'use client';
import { createContext, ReactNode, useState, useEffect, useCallback, useContext } from 'react';
import { LoadingScreen } from '@/components';
import { PUBLIC_ROUTES } from '@/constants';
import { USER_ACCESS_TOKEN } from '@/helpers';
import { useValidateToken } from '@/hooks';
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
	const validateToken = useValidateToken();

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

	useEffect(() => {
		const existingToken = USER_ACCESS_TOKEN;

		if (!existingToken) {
			if (!PUBLIC_ROUTES.includes(window.location.pathname)) {
				redirectToLogin();
			}
		} else {
			validateUserToken(existingToken as string);
		}
	}, []);

	if (validateToken.isLoading) {
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
