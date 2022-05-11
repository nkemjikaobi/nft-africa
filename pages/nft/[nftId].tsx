import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import MagnifiedNFT from 'components/MagnifiedNFT/MagnifiedNFT';
import useClickOutside from 'hooks/useClickOutside';
import React, { useContext, useEffect, useState } from 'react';
import WalletContext from 'context/wallet/WalletContext';
import { GetServerSideProps } from 'next';
import NFTDetailSkeleton from 'skeletons/NFTDetailSkeleton';
import SingleEthereumNFT from 'components/SingleEthereumNFT/SingleEthereumNFT';
import SingleArdorNFT from 'components/SingleArdorNFT/SingleArdorNFT';

interface IProductDetailPage {
	nftId: string;
}
const ProductDetailPage = ({ nftId }: IProductDetailPage) => {
	const time = new Date();
	const [showMagnified, setShowMagnified] = useState<boolean>(false);
	const node = useClickOutside(() => {
		setShowMagnified(false);
	});
	const walletContext = useContext(WalletContext);

	const [imageUrl, setImageUrl] = useState<string>('');

	const {
		fetchSingleNft,
		contract,
		singleNft,
		fetchSingleArdorNft,
		singleArdorNft,
		resetNFTItem,
	} = walletContext;

	useEffect(() => {
		let mounted = true;
		if (mounted && contract !== null) {
			if (nftId.length > 10) {
				fetchSingleArdorNft(nftId);
			} else {
				fetchSingleNft(contract, nftId);
			}
		}

		return () => {
			mounted = false;
			resetNFTItem();
		};
		//eslint-disable-next-line
	}, [contract]);

	useEffect(() => {
		let mounted = true;
		if (mounted && singleNft !== null) {
			setImageUrl(singleNft.fileUrl);
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [singleNft]);

	useEffect(() => {
		let mounted = true;
		if (mounted && singleArdorNft !== null) {
			setImageUrl(singleArdorNft.fileUrl);
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [singleArdorNft]);
	useEffect(() => {
		let mounted = true;
		if (mounted && singleNft !== null) {
			setImageUrl(singleNft.fileUrl);
		}

		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [singleNft]);

	return (
		<BasePageLayout>
			{singleNft === null && singleArdorNft === null ? (
				<NFTDetailSkeleton />
			) : (
				<>
					{singleNft && (
						<SingleEthereumNFT
							singleNft={singleNft}
							showMagnified={showMagnified}
							setShowMagnified={setShowMagnified}
							time={time}
						/>
					)}
					{singleArdorNft && (
						<SingleArdorNFT
							singleNft={singleArdorNft}
							showMagnified={showMagnified}
							setShowMagnified={setShowMagnified}
							setImageUrl={setImageUrl}
						/>
					)}

					{showMagnified && imageUrl && (
						<div
							className='absolute top-64 smallLaptop:top-40 4/4 mx-10 smallLaptop:mx-0 smallLaptop:left-1/4'
							ref={node}
						>
							<MagnifiedNFT url={imageUrl} />
						</div>
					)}
				</>
			)}
		</BasePageLayout>
	);
};

export default ProductDetailPage;

export const getServerSideProps: GetServerSideProps = async ({
	query: { nftId },
}) => {
	return {
		props: {
			nftId: nftId,
		},
	};
};
