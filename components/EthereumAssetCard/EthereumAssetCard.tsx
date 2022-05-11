import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaEthereum } from 'react-icons/fa';
import convertToEther from 'helpers/convertToEther';
import { AiTwotoneCloseCircle } from 'react-icons/ai';
import WalletContext from 'context/wallet/WalletContext';
import 'moment-timezone';
import shortenWalletAddress from 'helpers/shortenWalletAddress';
import IEthereumAsset from 'dto/NFT/IEthereumAsset';

interface IEthereumAssetCard {
	data: IEthereumAsset;
}
const EthereumAssetCard = ({ data }: IEthereumAssetCard) => {
	const router = useRouter();

	const walletContext = useContext(WalletContext);
	const { web3, isGuest, guestWeb3 } = walletContext;

	return (
		<>
			{data && (
				<div
					className='mb-4 bg-gray-200 hover:drop-shadow-lg'
					key={data.tokenId}
					//onClick={() => router.push(`nft/${data.tokenId}`)}
				>
					{data.fileUrl && (
						<Image
							src={data.fileUrl}
							width={500}
							height={500}
							alt='nft image'
						/>
					)}
					<div className='p-3 flex justify-between items-center'>
						<p>{data.name}</p>
						<FaEthereum />
					</div>
					<div className='p-3 flex justify-between items-center'>
						<p className='flex items-center'>Price</p>
						<p>
							{data.price &&
								convertToEther(isGuest ? guestWeb3 : web3, data.price)}{' '}
							ETH
						</p>
					</div>

					<div className='p-3 flex justify-between items-center'>
						<p className='tablet:text-xs smallLaptop:text-base'>Creator</p>
						<p className='tablet:text-xs smallLaptop:text-base'>
							{data.creator && shortenWalletAddress(data.creator)}
						</p>
					</div>
					<div className='p-3 flex justify-between items-center'>
						<p className='tablet:text-xs smallLaptop:text-base'>Owner</p>
						<p className='tablet:text-xs smallLaptop:text-base'>
							{data.owner && shortenWalletAddress(data.owner)}
						</p>
					</div>
					{data.sold && (
						<div className='p-3 flex justify-between items-center'>
							<p className='flex items-center'>
								Sold
								<AiTwotoneCloseCircle className='ml-2 text-xs text-red-400' />
							</p>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default EthereumAssetCard;
