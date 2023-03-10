'use client';
import { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Combobox, Transition } from '@headlessui/react';
import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import ChevronUpDownIcon from '@heroicons/react/24/outline/ChevronUpDownIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { Modal, Input, Label, Button, Loading } from '@/components';
import { useUserContext, useNotificationContext } from '@/contexts';
import { useUsersQuery, useAddChannelMutation } from '@/graphql';
import { TUser } from '@/types';

interface IAddChannelProps {
	isOpen: boolean;
	toggleAddChannel: (show: boolean) => void;
}

interface IAddChannelForm {
	name: string;
	description: string;
	members: Array<TUser>;
}

const AddChannel = ({ isOpen, toggleAddChannel }: IAddChannelProps): React.ReactElement => {
	const { handleSubmit, setValue, watch } = useForm<IAddChannelForm>({
		defaultValues: {
			name: '',
			description: '',
			members: []
		}
	});
	const { currentUser } = useUserContext();
	const { showNotification } = useNotificationContext();
	const { isLoading: isLoadingUsers, users } = useUsersQuery();
	const { isLoading: isLoadingChannel, addChannel } = useAddChannelMutation();

	const [memberQuery, setMemberQuery] = useState('');

	useEffect(() => {
		if (!isLoadingUsers && users && currentUser) {
			const currentUserDetails = users.find((u) => u.id === currentUser.id);
			if (currentUserDetails) {
				setValue('members', [currentUserDetails]);
			}
		}
	}, [isLoadingUsers, users, currentUser]);

	if (isLoadingUsers || !users) {
		return <Loading />;
	}

	const filteredPeople =
		memberQuery === ''
			? users
			: users.filter((person) =>
					`${person.firstName} ${person.lastName}`
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(memberQuery.toLowerCase().replace(/\s+/g, ''))
			  );

	const onSubmit = async (data: IAddChannelForm) => {
		try {
			const channel = await addChannel({
				name: data.name,
				...(data.description && {
					description: data.description
				}),
				ownerId: currentUser?.id as string,
				members: data.members.map((member) => member.id)
			});

			showNotification({
				type: 'success',
				title: `Successully created the channel "${channel.name}"`
			});
			toggleAddChannel(false);
		} catch (e) {
			const error = e as Error;
			console.log('Error: ', error.message);
			showNotification({
				type: 'error',
				title: 'Unable to create channel'
			});
		}
	};

	const FORM_STATE = watch();
	const IS_FORM_VALID = FORM_STATE.name && FORM_STATE.members.length > 1;

	return (
		<Modal isOpen={isOpen} title="Create a new channel">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
				<Input
					label="Name"
					type="text"
					placeholder='e.g. "New channel"'
					onChange={(name) => setValue('name', name)}
					autoFocus
				/>

				<Input
					label="Description (optional)"
					type="text"
					placeholder="Maximum 200 characters. Make it short and sweet!"
					maxLength={200}
					onChange={(desc) => setValue('description', desc)}
				/>

				<div className="flex flex-col mb-8">
					<Label className="mb-0">Members (select at least 2)</Label>

					<div className="flex flex-wrap gap-2 my-2">
						{FORM_STATE.members.map((member) => {
							const IS_CURRENT_USER = member.id === currentUser?.id;
							return (
								<div
									key={`chip-${member.id}`}
									className="flex items-center px-2 rounded-lg text-white bg-red-800 dark:bg-slate-900"
								>
									<label className="mr-2">
										{member.firstName} {member.lastName} {IS_CURRENT_USER && '(You)'}
									</label>
									<button
										type="button"
										onClick={() =>
											setValue(
												'members',
												FORM_STATE.members.filter((m) => m.id !== member.id)
											)
										}
									>
										<XMarkIcon className="h-4 w-4" />
									</button>
								</div>
							);
						})}
					</div>

					<Combobox
						onChange={(value: TUser) => {
							if (!FORM_STATE.members.find((m) => m.id === value.id)) {
								setValue('members', [...FORM_STATE.members, value]);
							}
						}}
					>
						<div className="relative mt-1">
							<div className="relative w-full cursor-default overflow-hidden border dark:border-slate-500 rounded-lg bg-white dark:bg-slate-500 text-left outline-none">
								<Combobox.Input
									className="w-full border-none py-2 pl-3 pr-10 text-sm rounded-lg outline-none leading-5 dark:bg-slate-500 text-gray-900 dark:text-white"
									onChange={(event) => setMemberQuery(event.target.value)}
								/>
								<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
									<ChevronUpDownIcon
										className="h-5 w-5 text-gray-400 dark:text-white"
										aria-hidden="true"
									/>
								</Combobox.Button>
							</div>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
								afterLeave={() => setMemberQuery('')}
							>
								<Combobox.Options className="absolute mt-1 max-h-52 w-full overflow-auto rounded-md bg-white dark:bg-slate-500 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{filteredPeople.length === 0 && memberQuery !== '' ? (
										<div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-white">
											Nothing found
										</div>
									) : (
										filteredPeople.map((user) => (
											<Combobox.Option
												key={user.id}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active
															? 'bg-red-600 dark:bg-slate-800 text-white'
															: 'text-gray-900 dark:text-white'
													}`
												}
												value={user}
											>
												{({ active }) => {
													const IS_SELECTED = FORM_STATE.members.find((m) => m.id === user.id);
													const IS_CURRENT_USER = user.id === currentUser?.id;
													return (
														<>
															<span
																className={`block truncate ${
																	IS_SELECTED ? 'font-medium' : 'font-normal'
																}`}
															>
																{user.firstName} {user.lastName} {IS_CURRENT_USER && '(You)'}
															</span>
															{IS_SELECTED && (
																<span
																	className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																		active ? 'text-white' : 'text-red-600 dark:text-slate-800'
																	}`}
																>
																	<CheckIcon
																		className="h-5 w-5 dark:text-white"
																		aria-hidden="true"
																	/>
																</span>
															)}
														</>
													);
												}}
											</Combobox.Option>
										))
									)}
								</Combobox.Options>
							</Transition>
						</div>
					</Combobox>
				</div>

				<div className="flex justify-between">
					<Button color="secondary" type="button" onClick={() => toggleAddChannel(false)}>
						Cancel
					</Button>
					<Button
						color="primary"
						type="submit"
						isLoading={isLoadingChannel}
						disabled={!IS_FORM_VALID}
					>
						Submit
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default AddChannel;
