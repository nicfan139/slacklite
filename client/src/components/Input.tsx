import { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import { Label } from './Typography';

interface IInputProps {
	label?: string;
	type: 'text' | 'email' | 'password';
	placeholder?: string;
	maxLength?: number;
	onChange: (value: string) => void;
	value?: string;
	autoFocus?: boolean;
	className?: string;
}

const Input = ({
	label,
	type,
	placeholder,
	maxLength,
	onChange,
	value,
	autoFocus = false,
	className
}: IInputProps) => {
	return (
		<div className={twMerge('flex flex-col mb-4', className)}>
			{label && <Label>{label}</Label>}

			<input
				type={type}
				placeholder={placeholder}
				maxLength={maxLength}
				onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
				value={value}
				autoFocus={autoFocus}
				className={
					'p-2 border dark:border-slate-500 dark:bg-slate-500 dark:outline-none dark:text-white rounded-lg'
				}
			/>
		</div>
	);
};

export default Input;
