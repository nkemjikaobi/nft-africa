import DesktopFooterOptions from 'components/FooterOptions/DesktopFooterOptions';
import { AboutUs } from 'componentData/Footer/AboutUs';
import { Community } from 'componentData/Footer/Community';
import { Support } from 'componentData/Footer/Support';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiMail } from 'react-icons/fi';


const DesktopFooter = () => {
	return (
		<div className='flex justify-between items-center bg-white px-10  laptop:px-40 laptop:py-5 drop-shadow-md h-80'>
			<div className='w-2/5 laptop:w-1/4 mt-2 laptop:mt-0'>
				<h4 className='font-bold cursor-pointer text-xl laptop:text-2xl mb-4'>
					<Image
						src='/images/logo.png'
						alt='nft-africa'
						width='80'
						height='80'
					/>
				</h4>
				<p className='text-sm text-gray-600 mb-2 w-2/3 '>
					Please contact us if you have any specific idea or request.
				</p>
				<p className='text-sm text-gray-600 flex items-center justify-start hover:text-blue-950'>
					<FiMail className='mr-1' />{' '}
					<Link href='mailto:email@example.com'>
						<a href='mailto:email@example.com' className='underline'>
							nft.africa@gmail.com
						</a>
					</Link>
				</p>
			</div>
			<div className='w-1/5 laptop:w-1/4 laptop:mt-7'>
				<DesktopFooterOptions title='About Us' options={AboutUs} />
			</div>
			<div className='w-1/5 laptop:w-1/4 laptop:mt-7'>
				<DesktopFooterOptions title='Support' options={Support} />
			</div>
			<div className='w-1/5 laptop:w-1/4 -mt-16 laptop:-mt-8'>
				<DesktopFooterOptions
					title='Community'
					options={Community}
					hasIcons={true}
				/>
			</div>
		</div>
	);
};

export default DesktopFooter;
