export const DesktopNav = [
	{
		id: 1,
		name: 'Home',
		route: '/',
		requiresAuth: false,
	},
	{
		id: 2,
		name: 'MarketPlace',
		route: '/explore',
		requiresAuth: false,
	},
	{
		id: 3,
		name: 'Connect Wallet',
		altName: 'Disconnect',
		route: '#',
		requiresAuth: true,
	},
	{
		id: 4,
		name: 'Create',
		route: '/nft/create',
		requiresAuth: true,
	},
];
