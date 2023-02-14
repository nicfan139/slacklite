import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import { twMerge } from 'tailwind-merge';

interface ILoadingProps {
	className?: string;
}

const Loading = ({ className }: ILoadingProps): React.ReactElement => {
	const twClass = twMerge('h-6 w-6 animate-spin', className);
	return <ArrowPathIcon className={twClass} />;
};

export default Loading;
