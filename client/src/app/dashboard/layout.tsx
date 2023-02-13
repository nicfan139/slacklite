'use client';
import Providers from './providers';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	// TODO: Add navbar here?
	return (
		<Providers>
			<main>{children}</main>
		</Providers>
	);
}
