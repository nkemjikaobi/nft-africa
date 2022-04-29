import { TabData } from 'componentData/Profile/TabData';
import React from 'react';

const Tabs = () => {
	return (
		<div className='flex items-center mt-8'>
			{TabData.map((tab: any) => (
				<div key={tab.id} className='flex items-center justify-between'>
					{<tab.icon />}
					<p>{tab.name}</p>
					{tab.count && <p>{tab.count}</p>}
				</div>
			))}
		</div>
	);
};

export default Tabs;
