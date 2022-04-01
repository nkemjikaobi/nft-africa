import { DesktopNav } from 'componentData/Navigation/DesktopNav';
import { connectWallet } from 'helpers/connectWallet';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

const DesktopNavigation = () => {
	const router = useRouter();

	const handleClick = (identifier: number, route: string) => {
		if (identifier === 4) {
			return connectWallet();
		}
		return router.push(route);
	};
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
			<ul className='flex justify-between items-center w-3/5 desktop:w-2/6'>
				{DesktopNav.map(data => (
					<li
						key={data.id}
						className={`${
							data.id === 4 &&
							'border border-black rounded-md py-3 px-8 hover:bg-black hover:text-white'
						}`}
					>
						<div>
							<span
								className={`cursor-pointer ${
									data.id !== 4 && 'hover:text-blue-950'
								}`}
								onClick={() => handleClick(data.id, data.route)}
							>
								{data.name}
							</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DesktopNavigation;
