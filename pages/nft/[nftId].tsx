import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import MagnifiedNFT from 'components/MagnifiedNFT/MagnifiedNFT';
import useClickOutside from 'hooks/useClickOutside';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import NFTDetailSkeleton from 'skeletons/NFTDetailSkeleton';
import SingleEthereumNFT from 'components/SingleEthereumNFT/SingleEthereumNFT';
import SingleArdorNFT from 'components/SingleArdorNFT/SingleArdorNFT';
import { useRouter } from 'next/router';
import Modal from 'components/Modal/Modal';
import useWallet from 'hooks/useWallet';

const ProductDetailPage = () => {
	const time = new Date();
	const [showMagnified, setShowMagnified] = useState<boolean>(false);
	const node = useClickOutside(() => {
		setShowMagnified(false);
	});

	const router = useRouter();

	const [imageUrl, setImageUrl] = useState<string>('');

	const {
		fetchSingleNft,
		contract,
		singleNft,
		fetchSingleArdorNft,
		singleArdorNft,
		resetNFTItem,
	} = useWallet();

	useEffect(() => {
		let mounted = true;
		if (mounted && contract !== null) {
			const nftId: any = router.query.nftId;
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

					<Modal toggleVisibility={setShowMagnified} visibility={showMagnified}>
						<MagnifiedNFT url={imageUrl && imageUrl} />
					</Modal>
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
