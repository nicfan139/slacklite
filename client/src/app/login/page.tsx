'use client';
import { useForm } from 'react-hook-form';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/outline/ChatBubbleLeftRightIcon';
import { Tabs, Box, Input, Button } from '@/components';
import { useUserContext, useNotificationContext } from '@/contexts';
import { useUserLogin } from '@/hooks';

interface ILoginForm {
	email: string;
	password: string;
}

export default function LoginPage(): React.ReactElement {
	const { handleSubmit, setValue, watch } = useForm<ILoginForm>({
		defaultValues: {
			email: '',
			password: ''
		}
	});
	const { setCurrentUser } = useUserContext();
	const { showNotification } = useNotificationContext();
	const userLogin = useUserLogin();

	const onSubmit = async (form: ILoginForm) => {
		const { status, data } = await userLogin.mutateAsync(form);
		if (status === 200) {
			localStorage.setItem('slacklite-userAccessToken', data.accessToken);
			setCurrentUser(data.user);
			window.location.href = '/dashboard';
		} else {
			showNotification({
				type: 'error',
				title: data.errorMessage
			});
		}
	};

	const FORM_STATE = watch();
	const IS_FORM_VALID = Boolean(FORM_STATE.email && FORM_STATE.password);

	return (
		<main className="h-screen w-screen flex flex-col justify-center items-center bg-red-400">
			<Tabs
				tabList={[
					{
						tabName: 'Login',
						href: '/login'
					},
					{
						tabName: 'Register',
						href: '/register'
					}
				]}
				activeTabIndex={0}
			/>

			<Box className="max-w-screen-sm">
				<div className="flex items-center mb-4">
					<ChatBubbleLeftRightIcon className="h-20 w-20 md:mr-2" />

					<h1 className="text-2xl font-bold">Login to Slacklite</h1>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						label="Email"
						type="email"
						onChange={(email) => setValue('email', email)}
						autoFocus
					/>

					<Input
						label="Password"
						type="password"
						onChange={(password) => setValue('password', password)}
					/>

					<Button
						color="primary"
						type="submit"
						isLoading={userLogin.isLoading}
						disabled={!IS_FORM_VALID}
					>
						Submit
					</Button>
				</form>
			</Box>
		</main>
	);
}
