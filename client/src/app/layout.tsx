import { Fira_Sans } from '@next/font/google';
import './globals.css';

const firaSans = Fira_Sans({
	subsets: ['latin'],
	weight: ['400', '600', '700']
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body className={firaSans.className}>{children}</body>
		</html>
	);
}
