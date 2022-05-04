import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaEthereum, FaGavel } from 'react-icons/fa';
import convertToEther from 'helpers/convertToEther';
import { HiCurrencyDollar } from 'react-icons/hi';
import { AiTwotoneCloseCircle } from 'react-icons/ai';
import WalletContext from 'context/wallet/WalletContext';
import INFT from 'dto/NFT/INFT';

interface IEthereumNFT {
	data: INFT;
}
const EthereumNFT = ({ data }: IEthereumNFT) => {
	const router = useRouter();

	const walletContext = useContext(WalletContext);
	const { web3, isGuest, guestWeb3 } = walletContext;

	return (
		<>
			{data && (
				<div
					className='mb-4 bg-gray-200 hover:drop-shadow-lg'
					key={data.tokenId}
					onClick={() => router.push(`nft/${data.tokenId}`)}
				>
					<Image src={data.fileUrl} width={500} height={500} alt='nft image' />
					<div className='p-3 flex justify-between items-center'>
						<p>{data.name}</p>
						<FaEthereum />
					</div>
					{data.sold ? (
						<div className='p-3 flex justify-between items-center'>
							<p className='flex items-center'>
								Price <HiCurrencyDollar className='ml-2' />
							</p>
							<p>
								{convertToEther(isGuest ? guestWeb3 : web3, data.price)} ETH
							</p>
						</div>
					) : (
						<div className='p-3 flex justify-between items-center'>
							<p className='flex items-center'>
								Current Bid <FaGavel className='ml-2' />
							</p>
							<p>
								{convertToEther(isGuest ? guestWeb3 : web3, data.price)} ETH
							</p>
						</div>
					)}

					<div className='p-3 flex justify-between items-center'>
						<p className='tablet:text-xs smallLaptop:text-base'>Creator</p>
						<p className='tablet:text-xs smallLaptop:text-base'>
							{data.owner.substring(0, 6)}
						</p>
					</div>
					<div className='p-3 flex items-center '>
						{data.sold ? (
							<p className='flex items-center'>
								Acquired
								<AiTwotoneCloseCircle className='ml-2 text-xs text-red-400' />{' '}
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
