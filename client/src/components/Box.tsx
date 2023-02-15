import { twMerge } from 'tailwind-merge';

interface IBoxProps {
	className?: string;
	children: React.ReactNode;
}

const Box = ({ className, children }: IBoxProps) => {
	const twClass = twMerge('w-full p-4 bg-white rounded-lg shadow-xl', className);
	return <section className={twClass}>{children}</section>;
};

export default Box;
