import { DesktopNav } from 'componentData/Navigation/DesktopNav';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import WalletContext from 'context/wallet/WalletContext';

const DesktopNavigation = () => {
	const router = useRouter();
	const walletContext = useContext(WalletContext);
	const { connectWallet, isConnected, balance, disconnectWallet } =
		walletContext;

	const handleClick = async (identifier: number, route: string) => {
		if (isConnected && identifier === 3) {
			return await disconnectWallet();
		}
		if (identifier === 3) {
			return await connectWallet();
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
			<ul className='flex justify-between items-center w-3/5 desktop:w-3/6'>
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
								{data.id === 3 && isConnected ? data.altName : data.name}
							</span>
						</div>
					</li>
				))}
				{isConnected && (
					<li className='border border-black rounded-md py-3 px-8 hover:bg-black hover:text-white'>
						<div>
							<span className='cursor-pointer'>{balance} ETH</span>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
};

export default DesktopNavigation;
