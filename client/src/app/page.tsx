'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components';
import { useUserContext } from '@/contexts';

export default function Home() {
	const router = useRouter();
	const { currentUser } = useUserContext();

	useEffect(() => {
		router.push(currentUser ? '/dashboard' : '/login');
	}, [currentUser]);

	return <LoadingScreen message="Redirecting" />;
}
