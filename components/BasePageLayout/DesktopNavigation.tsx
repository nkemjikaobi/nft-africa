import { DesktopNav } from 'data/Navigation/DesktopNav';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DesktopNavigation = () => {
	return (
		<div className='flex justify-between items-center bg-white py-5 px-10 tablet:px-20 laptop:px-40 drop-shadow-md'>
			<Link href='/'>
				<a href='' className='font-bold cursor-pointer text-2xl'>
					<Image
						src='/images/logo.png'
						alt='nft-africa'
						width='80'
						height='80'
					/>
				</a>
			</Link>
			<ul className='flex justify-between items-center w-3/5 tablet:w-3/5 laptop:w-3/5 desktop:w-2/6'>
				{DesktopNav.map(data => (
					<li
						key={data.id}
						className={`${
							data.id === 4 &&
							'border border-black rounded-md py-3 px-8 hover:bg-black hover:text-white'
						}`}
					>
						<Link href={data.route}>
							<a
								href={data.route}
								className={`${data.id !== 4 && 'hover:text-blue-950'}`}
							>
								{data.name}
							</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DesktopNavigation;
