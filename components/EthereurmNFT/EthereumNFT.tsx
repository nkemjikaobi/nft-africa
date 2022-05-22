import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaEthereum, FaGavel } from 'react-icons/fa';
import convertToEther from 'helpers/convertToEther';
import { FcAlarmClock } from 'react-icons/fc';
import { AiTwotoneCloseCircle } from 'react-icons/ai';
import INFT from 'dto/NFT/INFT';
import 'moment-timezone';
import moment from 'moment';
import shortenWalletAddress from 'helpers/shortenWalletAddress';
import { BLUR_DATA_URL } from 'constants/index';
import useWallet from 'hooks/useWallet';

interface IEthereumNFT {
	data: INFT;
}
const EthereumNFT = ({ data }: IEthereumNFT) => {
	const router = useRouter();

	const { web3, isGuest, guestWeb3 } = useWallet();
	const [timeToEnd, setTimeToEnd] = useState<number>(0);
	const [hasEnded, setHasEnded] = useState<boolean>(false);

	useEffect(() => {
		if (data) {
			const seconds = parseInt(data.duration) * 1000;
			const time: any = moment(seconds).fromNow();
			setTimeToEnd(time);
			if (time.includes('ago')) {
				setHasEnded(true);
			}
		}
		//eslint-disable-next-line
	}, []);

	return (
		<>
			{data && (
				<div
					className='mb-4 bg-gray-200 hover:drop-shadow-lg'
					key={data.tokenId}
					onClick={() => router.push(`nft/${data.tokenId}`)}
				>
					{data.fileUrl && (
						<Image
							src={data.fileUrl}
							width={500}
							height={500}
							alt='nft image'
							placeholder='blur'
							blurDataURL={`${BLUR_DATA_URL}`}
						/>
					)}
					<div className='p-3 flex justify-between items-center'>
						<p>{data.name}</p>
						<FaEthereum />
					</div>
					<div className='p-3 flex justify-between items-center'>
						<p className='flex items-center'>
							Current Bid <FaGavel className='ml-2' />
						</p>
						<p>
							{data.price &&
								convertToEther(isGuest ? guestWeb3 : web3, data.price)}{' '}
							ETH
						</p>
					</div>

					<div className='p-3 flex justify-between items-center'>
						<p className='tablet:text-xs smallLaptop:text-base'>Creator</p>
						<p className='tablet:text-xs smallLaptop:text-base'>
							{data.seller && shortenWalletAddress(data.seller)}
						</p>
					</div>
					{!hasEnded && (
						<div className='p-3 flex justify-between items-center'>
							<p className='flex items-center'>
								Auction ends <FcAlarmClock className='ml-2' />
							</p>
							<p>{timeToEnd}</p>
						</div>
					)}

					<div className='p-3 flex items-center '>
						{hasEnded ? (
							<p className='flex items-center'>
								Auction ended
								<AiTwotoneCloseCircle className='ml-2 text-xs text-red-400' />
							</p>
						) : (
							<p className='flex items-center'>
								Auction in Progress
								<AiTwotoneCloseCircle className='ml-2 text-xs text-green-400' />
							</p>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default EthereumNFT;
