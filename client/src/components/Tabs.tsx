import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

interface ITabsProps {
	tabList: Array<{
		tabName: string | React.ReactNode;
		href?: string;
		onClick?: () => void;
	}>;
	activeTabIndex: number;
	className?: string;
}

const Tabs = ({ tabList, activeTabIndex, className }: ITabsProps): React.ReactElement => (
	<Tab.Group>
		<Tab.List className={twMerge('flex space-x-1 rounded-lg bg-red-900/20 p-1', className)}>
			{tabList.map(({ tabName, href, onClick }, index) => {
				const IS_SELECTED_TAB = activeTabIndex === index;

				const className = twMerge(
					'w-32 rounded-lg p-4 text-md font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-red-400 transition-all',
					IS_SELECTED_TAB
						? 'text-red-700 bg-white shadow font-semibold'
						: 'text-white hover:bg-white/[0.12]'
				);

				if (href) {
					return (
						<Link key={`tab_${index}`} href={href}>
							<Tab className={className}>{tabName}</Tab>
						</Link>
					);
				}

				return (
					<Tab key={`tab_${index}`} className={className} {...(onClick && { onClick })}>
						{tabName}
					</Tab>
				);
			})}
		</Tab.List>
	</Tab.Group>
);

export default Tabs;
