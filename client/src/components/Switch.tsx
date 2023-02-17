import { Switch as HeadlessUISwitch } from '@headlessui/react';

interface ISwitchProps {
	checked: boolean;
	onChange: () => void;
}

const Switch = ({ checked, onChange }: ISwitchProps): React.ReactElement => (
	<HeadlessUISwitch
		checked={checked}
		onChange={onChange}
		className={`${checked ? 'bg-green-500' : 'bg-gray-700'}
      // relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent dark:border-white transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
	>
		<span className="sr-only">{checked ? 'YES' : 'NO'}</span>
		<span
			aria-hidden="true"
			className={`${checked ? 'translate-x-7' : 'translate-x-0'}
        pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
		/>
	</HeadlessUISwitch>
);

export default Switch;
