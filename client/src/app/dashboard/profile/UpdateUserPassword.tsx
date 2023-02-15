'use client';
import { useForm } from 'react-hook-form';
import { Modal, Input, Button } from '@/components';
import { useNotificationContext } from '@/contexts';
import { useUserUpdatePasswordMutation } from '@/graphql';
import { handleLogout } from '@/helpers';

interface IUpdateUserPasswordProps {
	isOpen: boolean;
	toggleUpdateUserPassword: (show: boolean) => void;
}

type TUpdateUserForm = {
	currentPassword: string;
	newPassword: string;
	newPasswordConfirm: string;
};

const UpdateUserPassword = ({
	isOpen,
	toggleUpdateUserPassword
}: IUpdateUserPasswordProps): React.ReactElement => {
	const { handleSubmit, setValue, watch } = useForm<TUpdateUserForm>({
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			newPasswordConfirm: ''
		}
	});
	const { isLoading: isLoadingPasswordUpdate, updatePassword } = useUserUpdatePasswordMutation();
	const { showNotification } = useNotificationContext();

	const onSubmit = async (data: TUpdateUserForm) => {
		if (data.newPassword !== data.newPasswordConfirm) {
			return showNotification({ type: 'error', title: 'New password and confirmation must match' });
		}

		const response = await updatePassword({
			currentPassword: data.currentPassword,
			newPassword: data.newPassword
		});

		if (response) {
			showNotification({
				type: 'success',
				title:
					'Successfully updated password. You will now be redirected back to the login screen.',
				onClose: handleLogout
			});
		} else {
			showNotification({ type: 'error', title: 'Unable to update user details at this time' });
		}
	};

	const FORM_STATE = watch();
	const IS_FORM_VALID =
		FORM_STATE.currentPassword && FORM_STATE.newPassword && FORM_STATE.newPasswordConfirm;

	return (
		<Modal isOpen={isOpen} title="Update your password">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
				<Input
					label="Current password"
					type="password"
					onChange={(currentPassword) => setValue('currentPassword', currentPassword)}
					value={FORM_STATE.currentPassword}
					autoFocus
				/>

				<Input
					label="New password"
					type="password"
					onChange={(newPassword) => setValue('newPassword', newPassword)}
					value={FORM_STATE.newPassword}
				/>

				<Input
					label="Confirm new password"
					type="password"
					onChange={(newPasswordConfirm) => setValue('newPasswordConfirm', newPasswordConfirm)}
					value={FORM_STATE.newPasswordConfirm}
				/>

				<div className="flex justify-between">
					<Button color="secondary" type="button" onClick={() => toggleUpdateUserPassword(false)}>
						Cancel
					</Button>
					<Button
						color="primary"
						type="submit"
						isLoading={isLoadingPasswordUpdate}
						disabled={!IS_FORM_VALID}
					>
						Submit
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default UpdateUserPassword;
