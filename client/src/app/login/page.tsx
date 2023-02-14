'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/outline/ChatBubbleLeftRightIcon';
import { Tabs, Box, Input, Button } from '@/components';
import { useUserContext, useNotificationContext } from '@/contexts';
import { useUserLogin } from '@/hooks';

interface ILoginForm {
	email: string;
	password: string;
}

export default function LoginPage(): React.ReactElement {
	const router = useRouter();
	const { setCurrentUser } = useUserContext();
	const { showNotification } = useNotificationContext();
	const userLogin = useUserLogin();

	const [form, setForm] = useState<ILoginForm>({
		email: '',
		password: ''
	});

	const IS_FORM_VALID = Boolean(form.email && form.password);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { status, data } = await userLogin.mutateAsync(form);
		if (status === 200) {
			localStorage.setItem('slacklite-userAccessToken', data.accessToken);
			setCurrentUser(data.user);
			router.push('/dashboard');
		} else {
			showNotification({
				type: 'error',
				title: data.errorMessage
			});
		}
	};

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

				<form onSubmit={onSubmit}>
					<Input
						label="Email"
						type="email"
						onChange={(email) => setForm({ ...form, email })}
						autoFocus
					/>

					<Input
						label="Password"
						type="password"
						onChange={(password) => setForm({ ...form, password })}
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
