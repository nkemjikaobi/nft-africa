import { DesktopNav } from 'componentData/Navigation/DesktopNav';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ETHEREUM } from 'constants/index';
import removeArdorZeroes from 'helpers/removeArdorZeroes';
import { FaUserAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import useWallet from 'hooks/useWallet';

interface IDesktopNavigation {
	handleClick: Function;
}
const DesktopNavigation = ({ handleClick }: IDesktopNavigation) => {
	const { isConnected, balance, network, ardorUserData } = useWallet();

	const router = useRouter();

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
			<ul className='flex justify-between items-center w-3/5'>
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
					<>
						<li className='border border-black rounded-md py-3 px-8 hover:bg-black hover:text-white'>
							<div>
								<span>
									{network === ETHEREUM ? (
										<>{Number(balance).toFixed(4)} ETH</>
									) : (
										<>
											{Number(
												ardorUserData !== null &&
													removeArdorZeroes(ardorUserData.balance)
											).toFixed(4)}{' '}
											ARD
										</>
									)}
								</span>
							</div>
						</li>
						<li onClick={() => router.push('/profile')}>
							<FaUserAlt className='cursor-pointer text-3xl' />
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default DesktopNavigation;
