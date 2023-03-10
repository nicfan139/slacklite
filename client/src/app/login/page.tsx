'use client';
import { useForm } from 'react-hook-form';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/outline/ChatBubbleLeftRightIcon';
import { Tabs, Box, Title, Input, Button } from '@/components';
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
			setCurrentUser(data.user);
			showNotification({
				type: 'success',
				title: 'Login successfull! You will be redirected in a few moments.'
			});
			if (typeof window !== 'undefined') {
				localStorage.setItem('slacklite-userAccessToken', data.accessToken);
				window.location.href = '/dashboard';
			}
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
		<main className="h-screen w-screen flex flex-col justify-start items-center pt-20 animated-bg">
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
				className="mb-4"
			/>

			<Box className="max-w-screen-sm">
				<div className="flex items-center mb-4">
					<ChatBubbleLeftRightIcon className="h-20 w-20 md:mr-2 text-slate-800" />

					<Title>
						<h1>Login to Slacklite</h1>
					</Title>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						label="Email"
						type="email"
						onChange={(email) => setValue('email', email)}
						value={FORM_STATE.email}
						autoFocus
					/>

					<Input
						label="Password"
						type="password"
						onChange={(password) => setValue('password', password)}
						value={FORM_STATE.password}
					/>

					<Button
						color="primary"
						type="submit"
						isLoading={userLogin.isLoading}
						disabled={!IS_FORM_VALID}
						className="mt-6"
					>
						Submit
					</Button>
				</form>
			</Box>
		</main>
	);
}
