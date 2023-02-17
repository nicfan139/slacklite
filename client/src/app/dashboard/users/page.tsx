'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingScreen, Loading, Title, Box, Switch } from '@/components';
import { useUserContext, useNotificationContext } from '@/contexts';
import { useUserQuery, useUsersQuery, useUserUpdateMutation } from '@/graphql';
import { TUser } from '@/types';

export default function AdminUsersPage(): React.ReactElement {
	const router = useRouter();
	const { currentUser, setCurrentUser } = useUserContext();
	const { showNotification } = useNotificationContext();
	const { isLoading: isLoadingUser, user } = useUserQuery(currentUser?.id);
	const { isLoading: isLoadingUsers, users } = useUsersQuery();
	const { updateUser } = useUserUpdateMutation();

	useEffect(() => {
		if (user) {
			if (user.isAdmin) {
				setCurrentUser(user);
			} else {
				router.push('/dashboard');
			}
		}
	}, [user]);

	if (isLoadingUser || !user?.isAdmin) {
		return <LoadingScreen />;
	}

	const onUserUpdate = async (user: TUser) => {
		try {
			await updateUser(user.id, {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				isAdmin: !user.isAdmin
			});
		} catch (e) {
			const error = e as Error;
			console.log('Error: ', error.message);
			showNotification({
				type: 'error',
				title: `Unable to update user #${user.id}`
			});
		}
	};

	return (
		<div className="mx-4">
			<Title className="mb-4">
				<h2>Users</h2>
			</Title>

			<Box>
				{isLoadingUsers || !users ? (
					<Loading />
				) : (
					<div className="w-full text-left text-slate-800 dark:text-white">
						<div className="grid grid-cols-5 border-b border-b-gray-500 dark:border-b-white text-lg">
							<div className="pb-2">ID</div>
							<div className="pb-2">First name</div>
							<div className="pb-2">Last name</div>
							<div className="pb-2">Email</div>
							<div className="pb-2 text-center">Is Admin</div>
						</div>

						<div className="max-h-96 overflow-y-auto pt-2">
							{users.map((user) => (
								<div key={`user-${user.id}`} className="grid grid-cols-5 py-2">
									<div>{user.id}</div>
									<div className="ml-1">{user.firstName}</div>
									<div className="ml-1">{user.lastName}</div>
									<div className="ml-1">{user.email}</div>
									<div className="flex justify-center ml-4">
										<Switch checked={user.isAdmin} onChange={() => onUserUpdate(user)} />
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</Box>
		</div>
	);
}
