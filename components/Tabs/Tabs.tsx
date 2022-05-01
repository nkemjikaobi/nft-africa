import { TabData } from 'componentData/Profile/TabData';
import capitalizeFirstLetter from 'helpers/capitalizeFirstLetter';
import React from 'react';

const Tabs = ({ active, setActive }: any) => {
	return (
		<div className='flex items-center mt-[11rem] laptop:mt-8 -ml-32 tablet:-ml-[12rem] laptop:-ml-[14rem]'>
			{TabData.map((tab: any) => (
				<div
					key={tab.id}
					className='flex items-center flex-col tablet:flex-row justify-between cursor-pointer mt-8'
					onClick={() => setActive(tab.id)}
				>
					<p className='tablet:ml-8 laptop:ml-16 text-xl mb-4'>
						{<tab.icon />}
					</p>
					<p className='mx-2 mb-4 text-gray-500'>
						{capitalizeFirstLetter(tab.name)}
					</p>
					{tab.count && <p className='mb-4'>{tab.count}</p>}
				</div>
			))}
		</div>
	);
};

export default Tabs;
