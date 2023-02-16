import Link from 'next/link';
import { twJoin } from 'tailwind-merge';
import Loading from './Loading';

interface IButtonProps {
	type: 'button' | 'submit';
	color: 'primary' | 'secondary' | 'tertiary' | 'toggle';
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
		'flex flex-row justify-center items-center p-2 px-4 rounded-lg font-semibold',
		color === 'primary' && 'border-2 border-red-500 dark:border-slate-900 bg-red-500 dark:bg-slate-900 text-white',
		color === 'secondary' && 'border-2 border-red-500 dark:border-slate-900 bg-white dark text-red-500 dark:text-slate-800',
		color === 'tertiary' &&
			'px-2 border-0 bg-white text-red-500 border-b-2 border-red-500 rounded-none shadow-none',
		(isLoading || disabled) && 'border-2 border-slate-400 bg-slate-400 cursor-not-allowed',
		className
	);

	const onButtonClick = () => {
		if (onClick && !isLoading && !disabled) {
			onClick();
		}
	};

	if (color === 'toggle') {
		return (
			<button
				type={type}
				onClick={onClick}
				className={twJoin(
					'flex flex-row items-center py-2 px-4 rounded-lg bg-red-800 dark:bg-slate-900 text-white font-semibold',
					disabled && 'bg-slate-500 cursor-not-allowed',
					className
				)}
				disabled={disabled}
			>
				{children}
			</button>
		);
	}

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
			{isLoading ? <Loading /> : children}
		</button>
	);
};

export default Button;
