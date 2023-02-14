import { ChangeEvent } from 'react';

interface IInputProps {
	label?: string;
	type: 'text' | 'email' | 'password';
	placeholder?: string;
	onChange: (value: string) => void;
	autoFocus?: boolean;
}

const Input = ({ label, type, placeholder, onChange, autoFocus = false }: IInputProps) => {
	return (
		<div className="flex flex-col mb-4">
			{label && (
				<label htmlFor={label} className="mb-1 font-semibold">
					{label}
				</label>
			)}

			<input
				name={label}
				type={type}
				placeholder={placeholder}
				onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
				autoFocus={autoFocus}
				className="p-2 border rounded-lg"
			/>
		</div>
	);
};

export default Input;
