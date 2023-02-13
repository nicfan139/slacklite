'use client';
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { twJoin } from 'tailwind-merge';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/outline/ChatBubbleLeftRightIcon'
import { Box, Input, Button } from '@/components';

interface ILoginForm {
	email: string;
	password: string;
}

export default function LoginPage(): React.ReactElement {
	const [form, setForm] = useState<ILoginForm>({
		email: '',
		password: ''
	});

	const TABS = [
		{
			name: 'Login',
			selected: true
		},
		{
			name: 'Register',
			selected: false
		}
	];

	return (
		<main className="h-screen w-screen flex flex-col justify-center items-center bg-blue-400">
			<Tab.Group>
				<Tab.List className="flex space-x-1 mb-4 rounded-lg bg-blue-900/20 p-1">
					{TABS.map(({ name, selected }) => {
						const className = twJoin(
							'w-32 rounded-lg p-4 text-md font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
							selected
								? 'bg-white shadow font-semibold'
								: 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
						);
						return <Tab className={className}>{name}</Tab>;
					})}
				</Tab.List>
			</Tab.Group>

			<Box>
        <div className='flex items-center mb-4'>
          <ChatBubbleLeftRightIcon className='h-20 w-20 md:mr-2' />
          
          <h1 className="text-2xl font-bold">
            Login to Slacklite
          </h1>
        </div>

        <form>
          <Input
            label="Email"
            type='email'
            onChange={(email) => setForm({ ...form, email })}
            autoFocus
          />

          <Input
            label="Password"
            type='password'
            onChange={(password) => setForm({ ...form, password })}
          />

          <Button color="primary" type="submit" disabled={!Boolean(form.email && form.password)}>
            Submit
          </Button>
        </form>
			</Box>
		</main>
	);
}
