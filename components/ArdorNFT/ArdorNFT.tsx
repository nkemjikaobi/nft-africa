import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaEthereum } from 'react-icons/fa';
import formatArdorImageUrl from 'helpers/formatArdorImageUrl';
import axios from 'axios';
import IArdorNFT from 'dto/NFT/IArdorNFT';
import shortenWalletAddress from 'helpers/shortenWalletAddress';
import { BLUR_DATA_URL } from 'constants/index';

interface IArdorNFt {
	data: IArdorNFT;
}
const ArdorNFT = ({ data }: IArdorNFt) => {
	const router = useRouter();

	const [imageCID, setImageCID] = useState<string>('');

	const fetchImage = async (cid: string) => {
		try {
			const url = await axios.get(cid);
			const finalUrl = url.data.fileUrl;
			setImageCID(finalUrl);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (data) {
			const cid = formatArdorImageUrl(data.description);
			fetchImage(cid);
		}
	}, [data]);

	return (
		<>
			<div
				className='mb-4 bg-gray-200 hover:drop-shadow-lg'
				key={data.asset}
				onClick={() => router.push(`nft/${data.asset}`)}
			>
				{imageCID !== '' && (
					<Image
						src={imageCID}
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
					<p className='tablet:text-xs smallLaptop:text-base'>Creator</p>
					<p className='tablet:text-xs smallLaptop:text-base'>
						{data.accountRS && shortenWalletAddress(data.accountRS)}
					</p>
				</div>
			</div>
		</>
	);
};

export default ArdorNFT;