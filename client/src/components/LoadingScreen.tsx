import { twJoin } from 'tailwind-merge';
import Loading from './Loading';

interface ILoadingScreenProps {
	message?: string;
	className?: string;
}

const LoadingScreen = ({ message, className }: ILoadingScreenProps): React.ReactElement => (
	<div
		className={twJoin(
			'fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-white',
			className
		)}
	>
		<Loading className="h-20 w-20" />
		{message && <p className="mt-2 text-xl">{message}</p>}
	</div>
);

export default LoadingScreen;
