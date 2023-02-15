'use client';
import { useForm } from 'react-hook-form';
import { Modal, Input, Button } from '@/components';
import { useNotificationContext } from '@/contexts';
import { useUserUpdateMutation } from '@/graphql';
import { TUser } from '@/types';

interface IUpdateUserDetailsProps {
	isOpen: boolean;
	toggleUpdateUserDetails: (show: boolean) => void;
	user: TUser;
}

type TUpdateUserForm = Pick<TUser, 'firstName' | 'lastName' | 'email'>;

const UpdateUserDetails = ({
	isOpen,
	toggleUpdateUserDetails,
	user
}: IUpdateUserDetailsProps): React.ReactElement => {
	const { handleSubmit, setValue, watch } = useForm<TUpdateUserForm>({
		defaultValues: {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email
		}
	});
	const { isLoading: isLoadingUserUpdate, addMessage } = useUserUpdateMutation();
	const { showNotification } = useNotificationContext();

	const onSubmit = async (data: TUpdateUserForm) => {
		const response = await addMessage(user.id, data);
		if (response) {
			showNotification({ type: 'success', title: 'Updated details successfully' });
			toggleUpdateUserDetails(false);
		} else {
			showNotification({ type: 'error', title: 'Unable to update user details at this time' });
		}
	};

	const FORM_STATE = watch();
	const IS_FORM_VALID = FORM_STATE.firstName && FORM_STATE.lastName && FORM_STATE.email;

	return (
		<Modal isOpen={isOpen} title="Update details">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
				<Input
					label="First name"
					type="text"
					onChange={(firstName) => setValue('firstName', firstName)}
					value={FORM_STATE.firstName}
					autoFocus
				/>

				<Input
					label="Last name"
					type="text"
					onChange={(lastName) => setValue('lastName', lastName)}
					value={FORM_STATE.lastName}
				/>

				<Input
					label="Email"
					type="email"
					onChange={(email) => setValue('email', email)}
					value={FORM_STATE.email}
				/>

				<div className="flex justify-between">
					<Button color="secondary" type="button" onClick={() => toggleUpdateUserDetails(false)}>
						Cancel
					</Button>
					<Button
						color="primary"
						type="submit"
						isLoading={isLoadingUserUpdate}
						disabled={!IS_FORM_VALID}
					>
						Submit
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default UpdateUserDetails;
