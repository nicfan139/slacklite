'use client';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import LockClosedIcon from '@heroicons/react/24/outline/LockClosedIcon';
import { Loading, Title, Heading, Box, Button, Label, Select } from '@/components';
import { useNotificationContext, useUserContext } from '@/contexts';
import { useUserQuery, usePreferenceUpdateMutation } from '@/graphql';
import { TPreferences, TPreferencesChatNameDisplay } from '@/types';
import UpdateUserDetails from './UpdateUserDetails';
import UpdateUserPassword from './UpdateUserPassword';

export default function ProfilePage(): React.ReactElement {
	const { currentUser, setCurrentUser } = useUserContext();
	const { showNotification } = useNotificationContext();

	const { isLoading: isLoadingUser, user } = useUserQuery(currentUser?.id);
	const { isLoading: isLoadingUpdatePreference, updatePreference } = usePreferenceUpdateMutation();

	const [showUpdateUserDetails, toggleUpdateUserDetails] = useState<boolean>(false);
	const [showUpdateUserPassword, toggleUpdateUserPassword] = useState<boolean>(false);
	const [preferences, setPreferences] = useState<Omit<TPreferences, 'createdAt' | 'updatedAt'>>({
		id: '',
		colorScheme: 'red',
		darkModeEnabled: false,
		chatNameDisplay: 'firstName'
	});

	useEffect(() => {
		if (user) {
			setCurrentUser(user);
			setPreferences(user.preferences);
		}
	}, [user]);

	const onUpdatePreferencesSubmit = async () => {
		try {
			const preference = await updatePreference({
				preferenceId: preferences.id,
				input: {
					colorScheme: preferences.colorScheme,
					darkModeEnabled: preferences.darkModeEnabled,
					chatNameDisplay: preferences.chatNameDisplay
				},
				userId: user?.id as string
			});

			if (preference) {
				showNotification({
					type: 'success',
					title: 'Successfully updated your preferences!'
				});
				setPreferences(preference);
			}
		} catch (e) {
			const error = e as Error;
			console.log('Error: ', error.message);
			showNotification({
				type: 'error',
				title: 'Unable to update your preferences at this time'
			});
		}
	};

	if (!currentUser || isLoadingUser || !user) return <Loading />;

	return (
		<div className="mx-4">
			<UpdateUserDetails
				isOpen={showUpdateUserDetails}
				toggleUpdateUserDetails={toggleUpdateUserDetails}
				user={user}
			/>
			<UpdateUserPassword
				isOpen={showUpdateUserPassword}
				toggleUpdateUserPassword={toggleUpdateUserPassword}
			/>

			<Title className="mb-4">
				<h2>Profile</h2>
			</Title>

			<Box>
				<div className="flex flex-col md:grid md:grid-cols-2">
					<div className="p-4 border-b md:border-r md:border-b-0">
						<div className="flex justify-between mb-4">
							<Heading className="text-3xl">
								<h3>Your details</h3>
							</Heading>

							<Button color="toggle" type="button" onClick={() => toggleUpdateUserDetails(true)}>
								<PencilSquareIcon className="h-4 w-4 mr-2" />
								Update
							</Button>
						</div>

						<div className="max-w-md">
							<div className="mb-2 pb-2 border-b">
								<Label>ID</Label>
								<p>{currentUser.id}</p>
							</div>

							<div className="grid grid-cols-2 gap-2 mb-2 pb-2 border-b">
								<div>
									<Label>First name</Label>
									<p>{currentUser.firstName}</p>
								</div>

								<div>
									<Label>Last name</Label>
									<p>{currentUser.lastName}</p>
								</div>
							</div>

							<div className="mb-2 pb-2 border-b">
								<Label>Email</Label>
								<p>{currentUser.email}</p>
							</div>

							<div className="grid grid-cols-2 gap-2 mb-2">
								<div>
									<Label>Member since</Label>
									<p>{dayjs(currentUser.createdAt).format('YYYY-MM-DD')}</p>
								</div>

								<div>
									<Label>Last updated</Label>
									<p>{dayjs(currentUser.updatedAt).format('YYYY-MM-DD')}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="p-4">
						<Heading className="mb-4 text-3xl">
							<h3>Preferences</h3>
						</Heading>

						<div className="flex justify-between items-center mb-4">
							<Label>Change password?</Label>
							<Button color="toggle" type="button" onClick={() => toggleUpdateUserPassword(true)}>
								<LockClosedIcon className="h-4 w-4 mr-2" />
								Update
							</Button>
						</div>

						{/* TODO: set up color scheme
            <div className='flex justify-between items-center mb-4'>
              <Label>
                Color scheme
              </Label>

              <p>{user.preferences.colorScheme}</p>
            </div>
            */}

						{/* TODO: set up dark mode
            <div className='flex justify-between items-center mb-4'>
              <Label>
                Dark mode
              </Label>

              <p>{String(user.preferences.darkModeEnabled)}</p>
            </div>
            */}

						<div className="flex justify-between items-center mb-4">
							<Label className="mb-0">Name to display in chat</Label>

							<Select
								options={[
									{
										label: 'Full name',
										value: 'fullName'
									},
									{
										label: 'First name',
										value: 'firstName'
									},
									{
										label: 'Email',
										value: 'email'
									}
								]}
								onChange={(value: string) =>
									setPreferences({
										...preferences,
										chatNameDisplay: value as TPreferencesChatNameDisplay
									})
								}
								selectedValue={preferences.chatNameDisplay}
								className="w-36"
							/>
						</div>

						<Button
							color="primary"
							type="button"
							onClick={onUpdatePreferencesSubmit}
							isLoading={isLoadingUpdatePreference}
						>
							Update preferences
						</Button>
					</div>
				</div>
			</Box>
		</div>
	);
}
