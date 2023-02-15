'use client';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import { Loading, Title, Heading, Box, Button, Label } from '@/components';
import { useUserContext } from '@/contexts';
import { useUserQuery } from '@/graphql';
import UpdateUserDetails from './UpdateUserDetails';

export default function ProfilePage(): React.ReactElement {
	const { currentUser, setCurrentUser } = useUserContext();
	const { isLoading: isLoadingUser, user } = useUserQuery(currentUser?.id);

	const [showUpdateUserDetails, toggleUpdateUserDetails] = useState<boolean>(false);

	useEffect(() => {
		if (user) {
			setCurrentUser(user);
		}
	}, [user]);

	if (!currentUser || isLoadingUser || !user) return <Loading />;

	return (
		<div className="mx-4">
			<UpdateUserDetails
				isOpen={showUpdateUserDetails}
				toggleUpdateUserDetails={toggleUpdateUserDetails}
				user={user}
			/>

			<Title className="mb-4">
				<h2>Profile</h2>
			</Title>

			<Box>
				<div className="flex flex-col md:grid md:grid-cols-2">
					<div className="p-4 border-b md:border-r md:border-b-0">
						<div className="flex justify-between mb-4">
							<Heading>
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
						<Heading>
							<h3>Preferences</h3>
						</Heading>

						{/* TODO: add dark mode + change password */}
					</div>
				</div>
			</Box>
		</div>
	);
}
