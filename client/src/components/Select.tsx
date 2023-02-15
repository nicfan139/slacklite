import { ReactElement, Fragment } from 'react';
import { twMerge } from 'tailwind-merge';
import { Listbox, Transition } from '@headlessui/react';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import CheckIcon from '@heroicons/react/24/outline/CheckIcon';

type TSelectOption = {
	label: string;
	value: string;
};

interface ISelectProps {
	options: Array<TSelectOption>;
	onChange: (value: string) => void;
	selectedValue: string;
	className?: string;
}

const Select = ({ options, onChange, selectedValue, className }: ISelectProps): ReactElement => {
	return (
		<Listbox value={selectedValue} onChange={onChange}>
			<div className="relative mt-1">
				<Listbox.Button
					className={twMerge(
						'relative w-full cursor-default rounded-lg border bg-white py-2 pl-3 pr-10 text-left shadow-md sm:text-sm',
						className
					)}
				>
					<span className="block truncate">
						{options.find((opt) => opt.value === selectedValue)?.label}
					</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{options.map(({ label, value }, index) => (
							<Listbox.Option
								key={index}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active ? 'bg-red-100 text-red-900' : 'text-gray-900'
									}`
								}
								value={value}
							>
								{({ selected }) => (
									<>
										<span className={`block ${selected ? 'font-medium' : 'font-normal'}`}>
											{label}
										</span>
										{selected && (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										)}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
};

export default Select;
