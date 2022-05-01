import { TabData } from 'componentData/Profile/TabData';
import capitalizeFirstLetter from 'helpers/capitalizeFirstLetter';
import React from 'react';

const Tabs = ({ active, setActive }: any) => {
	return (
		<div className='flex items-center mt-8 -ml-32'>
			{TabData.map((tab: any) => (
				<>
					<div
						key={tab.id}
						className='flex items-center justify-between cursor-pointer mt-8'
						onClick={() => setActive(tab.id)}
					>
						<p className='ml-16 text-xl mb-4'>{<tab.icon />}</p>
						<p className='mx-2 mb-4 text-gray-500'>
							{capitalizeFirstLetter(tab.name)}
						</p>
						{tab.count && <p className='mb-4'>{tab.count}</p>}
						{active === tab.id && (
							<div className='mt-[5%] -ml-[120px] text-blue-950'>
								_________________
							</div>
						)}
					</div>
				</>
			))}
		</div>
	);
};

export default Tabs;
