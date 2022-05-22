import { useState } from 'react';
import { Tab } from '@headlessui/react';

const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(' ');
};

interface ISwitchBlockChainNetwork {
	handleClick: Function;
}

const SwitchBlockChainNetwork = ({ handleClick }: ISwitchBlockChainNetwork) => {
	const [categories] = useState({
		Ethereum: null,
		Ardor: null,
	});

	return (
		<div className='w-full max-w-md px-2 py-16 sm:px-0'>
			<Tab.Group
				onChange={(index: number) => {
					handleClick(index);
				}}
			>
				<Tab.List className='flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
					{Object.keys(categories).map(category => (
						<Tab
							key={category}
							className={({ selected }: any) =>
								classNames(
									'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
									'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
									selected
										? 'bg-white shadow'
										: 'hover:bg-white/[0.12] hover:text-white'
								)
							}
						>
							{category}
						</Tab>
					))}
				</Tab.List>
			</Tab.Group>
		</div>
	);
};

export default SwitchBlockChainNetwork;
