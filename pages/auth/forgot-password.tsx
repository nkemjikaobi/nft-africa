import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import Link from 'next/link';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

const ForgotPasswordPage = () => {
	return (
		<BasePageLayout>
			<div className='tablet:w-600 tablet:container text-center'>
				<h1 className='uppercase text-2xl tablet:text-4xl font-extrabold mb-4 mt-64'>
					Password Reset
				</h1>
				<div>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
						type='email'
						placeholder='Email Address'
					/>
				</div>

				<div className='flex justify-center mb-5'>
					<button className='bg-black flex items-center justify-center p-5 w-2/3 rounded-md text-white mt-4 hover:bg-white hover:text-black hover:border hover:border-black'>
						{' '}
						Reset Password <BsArrowRight className='ml-4' />
					</button>
				</div>
				<Link href="/auth/login"><a href="" className='text-left text-blue-950 hover:text-blue-950'>Back to Login</a></Link>
			</div>
		</BasePageLayout>
	);
};

export default ForgotPasswordPage;
