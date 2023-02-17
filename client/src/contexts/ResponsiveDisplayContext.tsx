'use client';
import { createContext, ReactNode, ReactElement, useState, useEffect, useContext } from 'react';

interface IResponsiveDisplayContext {
	isMobile: boolean;
	isDesktop: boolean;
}

const ResponsiveDisplayContext = createContext<IResponsiveDisplayContext>({
	isMobile: false,
	isDesktop: false
});

export const ResponsiveDisplayContextProvider = ({
	children
}: {
	children: ReactNode;
}): ReactElement => {
	const [isMobile, setIsMobile] = useState<boolean>(
		typeof window !== 'undefined' ? window.innerWidth < 768 : false
	);

	useEffect(() => {
		const getScreenSize = () => {
			if (typeof window !== 'undefined') {
				const screenWidth = window.innerWidth;
				setIsMobile(screenWidth < 768);
			}
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', getScreenSize);
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', getScreenSize);
			}
		};
	}, []);

	return (
		<ResponsiveDisplayContext.Provider
			value={{
				isMobile,
				isDesktop: !isMobile
			}}
		>
			{children}
		</ResponsiveDisplayContext.Provider>
	);
};

export const useResponsiveDisplay = () => useContext(ResponsiveDisplayContext);
