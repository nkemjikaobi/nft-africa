import React from 'react';
import { useTimer } from 'react-timer-hook';

const CountdownTimer = ({ expiryTimestamp }: any) => {
	const { seconds, minutes, hours, days, isRunning } = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn('onExpire called'),
	});

	return (
		<div>
			{isRunning ? (
				<div className='mt-2'>
					<span className='bg-black px-2 rounded-md py-1 mx-1 text-white'>
						{days}
					</span>
					:
					<span className='bg-black px-2 rounded-md py-1 mx-1 text-white'>
						{hours}
					</span>
					:
					<span className='bg-black px-2 rounded-md py-1 mx-1 text-white'>
						{minutes}
					</span>
					:
					<span className='bg-black px-2 rounded-md py-1 mx-1 text-white'>
						{seconds}
					</span>
				</div>
			) : (
				<span className='text-red-500'>Time elapsed</span>
			)}
		</div>
	);
};

export default CountdownTimer;
