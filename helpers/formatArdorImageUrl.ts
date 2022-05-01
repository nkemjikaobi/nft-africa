const formatArdorImageUrl = (description: string) => {
	const split = description.split('||');
	const lastItem = split[split.length - 1];
	const result = `${process.env.NEXT_PUBLIC_IPFS_BASE_URL}/${lastItem}`;
	return result;
};

export default formatArdorImageUrl;