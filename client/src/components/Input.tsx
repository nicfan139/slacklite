import { ChangeEvent } from 'react';
import { Label } from './Typography';

interface IInputProps {
	label?: string;
	type: 'text' | 'email' | 'password';
	placeholder?: string;
	maxLength?: number;
	onChange: (value: string) => void;
	value?: string;
	autoFocus?: boolean;
}

const Input = ({
	label,
	type,
	placeholder,
	maxLength,
	onChange,
	value,
	autoFocus = false
}: IInputProps) => {
	return (
		<div className="flex flex-col mb-4">
			{label && <Label>{label}</Label>}

			<input
				type={type}
				placeholder={placeholder}
				maxLength={maxLength}
				onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
				value={value}
				autoFocus={autoFocus}
				className="p-2 border rounded-lg"
			/>
		</div>
	);
};

export default Input;
