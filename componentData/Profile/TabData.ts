import { BiShapePolygon, BiPurchaseTagAlt } from 'react-icons/bi';
import { BsViewList } from 'react-icons/bs';
import { GrTransaction } from 'react-icons/gr';
export const TabData = [
	{
		id: 1,
		name: 'minted',
		icon: BiShapePolygon,
		count: 5,
	},
	{
		id: 2,
		name: 'purchased',
		icon: BiPurchaseTagAlt,
		count: 10,
	},
	{
		id: 3,
		name: 'listed',
		icon: BsViewList,
		count: 5,
	},
	{
		id: 4,
		name: 'transactions',
		icon: GrTransaction,
		count: 5,
	},
];
