import MobileFooterOptions from 'components/FooterOptions/MobileFooterOptions';
import { AboutUs } from 'data/Footer/AboutUs';
import { Community } from 'data/Footer/Community';
import { Support } from 'data/Footer/Support';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiMail } from 'react-icons/fi';

const MobileFooter = () => {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	return (
		<div className='flex flex-col justify-between tablet:items-center bg-white px-3 tablet:px-10  laptop:px-40 laptop:py-5 drop-shadow-md tablet:h-80'>
			<div className='tablet:w-2/5 laptop:w-1/4 mt-4 laptop:mt-0'>
				<p className='text-sm text-gray-600 mb-2 w-full tablet:w-2/3 '>
					Please contact us if you have any specific idea or request.
				</p>
				<p className='text-sm text-gray-600 flex items-center justify-start'>
					<FiMail className='mr-1' />{' '}
					<Link href='mailto:email@example.com'>
						<a href='#' className='underline'>
							nft.africa@gmail.com
						</a>
					</Link>
				</p>
			</div>
			<div className='w-full laptop:mt-7'>
				<MobileFooterOptions
					title='About Us'
					options={AboutUs}
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
					identifier={1}
				/>
			</div>
			<div className='w-full laptop:mt-7'>
				<MobileFooterOptions
					title='Support'
					options={Support}
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
					identifier={2}
				/>
			</div>
			<div className='w-full  laptop:-mt-8'>
				<MobileFooterOptions
					title='Community'
					options={Community}
					hasIcons={true}
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
					identifier={3}
				/>
			</div>
		</div>
	);
};

export default MobileFooter;
