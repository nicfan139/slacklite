import { ReactNode, ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

interface ITypographyProps {
	className?: string;
	children: ReactNode;
}

export const Title = ({ className, children }: ITypographyProps): ReactElement => (
	<div className={twMerge('text-4xl text-slate-800 dark:text-white font-bold', className)}>{children}</div>
);

export const Heading = ({ className, children }: ITypographyProps): ReactElement => (
	<div className={twMerge('text-2xl text-slate-800 dark:text-white font-semibold', className)}>{children}</div>
);

export const Label = ({ className, children }: ITypographyProps): ReactElement => (
	<label className={twMerge('mb-1 text-slate-800 dark:text-white font-semibold', className)}>{children}</label>
);
