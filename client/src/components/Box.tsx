import { twMerge } from 'tailwind-merge';

interface IBoxProps {
	className?: string;
	children: React.ReactNode;
}

const Box = ({ className, children }: IBoxProps) => (
	<section className={twMerge('w-full p-4 bg-white dark:bg-slate-700 rounded-lg shadow-xl', className)}>{children}</section>
)

export default Box;
