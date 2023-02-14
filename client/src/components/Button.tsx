import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Loading from './Loading';

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
	const twClass = twMerge(
		'flex flex-row justify-center items-center p-2 px-4 rounded-lg',
		color === 'primary' && 'border-2 border-red-500 bg-red-500 text-white',
		color === 'secondary' && 'border-2 border-red-500 bg-white text-red-500',
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
