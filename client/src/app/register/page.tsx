'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/outline/ChatBubbleLeftRightIcon';
import { Tabs, Box, Title, Input, Button } from '@/components';
import { useNotificationContext } from '@/contexts';
import { useUserCreate } from '@/hooks';

interface IRegisterForm {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export default function RegisterPage() {
	const router = useRouter();
	const { handleSubmit, setValue, watch } = useForm<IRegisterForm>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		}
	});
	const { showNotification } = useNotificationContext();
	const userCreate = useUserCreate();

	const onSubmit = async (data: IRegisterForm) => {
		const { status } = await userCreate.mutateAsync(data);
		if (status === 201) {
			showNotification({
				type: 'success',
				title:
					"Successfully registered! Once 'Ok' is clicked, you will be redirected to the login screen",
				onClose: () => router.push('/login')
			});
		} else {
			showNotification({
				type: 'error',
				title: 'Unable to register new user at this time'
			});
		}
	};

	const FORM_STATE = watch();
	const IS_FORM_VALID = Boolean(
		FORM_STATE.firstName && FORM_STATE.lastName && FORM_STATE.email && FORM_STATE.password
	);

	return (
		<main className="h-screen w-screen flex flex-col justify-start items-center pt-20 bg-red-400">
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
				activeTabIndex={1}
				className="mb-4"
			/>

			<Box className="max-w-screen-sm">
				<div className="flex items-center mb-4">
					<ChatBubbleLeftRightIcon className="h-20 w-20 md:mr-2 text-slate-800" />

					<Title>
						<h1>Sign up for Slacklite</h1>
					</Title>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="w-full flex gap-2 justify-between">
						<Input
							label="First name"
							type="text"
							onChange={(firstName) => setValue('firstName', firstName)}
							value={FORM_STATE.firstName}
							autoFocus
							className="w-full"
						/>

						<Input
							label="Last name"
							type="text"
							onChange={(lastName) => setValue('lastName', lastName)}
							value={FORM_STATE.lastName}
							className="w-full"
						/>
					</div>

					<Input
						label="Email"
						type="email"
						onChange={(email) => setValue('email', email)}
						value={FORM_STATE.email}
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
						isLoading={userCreate.isLoading}
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
