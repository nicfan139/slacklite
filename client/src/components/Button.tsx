import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

interface IButtonProps {
	type: 'button' | 'submit';
	color: 'primary' | 'secondary' | 'tertiary';
	href?: string;
	onClick?: () => void;
	isLoading?: boolean;
	disabled?: boolean;
	className?: string;
	children: React.ReactNode;
}

const Button = ({
	type,
	color = 'primary',
	href,
	onClick,
	isLoading = false,
	disabled = false,
	className,
	children
}: IButtonProps): React.ReactElement => {
	const twClass = twJoin(
		'flex flex-row justify-center items-center p-2 px-4 rounded',
		color === 'primary' && 'border-2 border-blue-500 bg-blue-500 text-white',
		color === 'secondary' && 'border-2 border-blue-500 bg-white text-blue-500',
		color === 'tertiary' && 'border-0 bg-white text-black',
		(isLoading || disabled) && 'border-2 border-slate-400 bg-slate-400 cursor-not-allowed',
		className
	);

	const onButtonClick = () => {
		if (onClick && !isLoading && !disabled) {
			onClick();
		}
	};

	if (href) {
		return (
			<Link href={href} className={twClass}>
				{children}
			</Link>
		);
	}

	return (
		<button
			type={type}
			onClick={onButtonClick}
			className={twClass}
			disabled={isLoading || disabled}
		>
			{children}
		</button>
	);
};

export default Button;
