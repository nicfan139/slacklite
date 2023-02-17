import { createContext, ReactNode, ReactElement, useState, useEffect, useContext } from 'react';

interface IResponsiveDisplayContext {
  isMobile: boolean;
  isDesktop: boolean;
}

const ResponsiveDisplayContext = createContext<IResponsiveDisplayContext>({
  isMobile: false,
  isDesktop: false,
});

export const ResponsiveDisplayContextProvider = ({ children }: { children: ReactNode }): ReactElement => {
	const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

	useEffect(() => {
		const getScreenSize = () => {
			const screenWidth = window.innerWidth;
			setIsMobile(screenWidth < 768)
		}

		window.addEventListener("resize", getScreenSize)

		return () => {
			window.removeEventListener("resize", getScreenSize)
		}
	}, [])
  
  return (
    <ResponsiveDisplayContext.Provider
      value={{
        isMobile,
        isDesktop: !isMobile
      }}
    >
      {children}
    </ResponsiveDisplayContext.Provider>
  )
}

export const useResponsiveDisplay = () => useContext(ResponsiveDisplayContext)