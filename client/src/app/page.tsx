'use client';
import { useState } from 'react';
import { Notification } from '@/components';

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<main className={`text-3xl`}>
			<button type="button" onClick={() => setIsOpen(true)}>
				Open
			</button>

			<Notification
				type="warning"
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Welcome!"
			/>
		</main>
	);
}
