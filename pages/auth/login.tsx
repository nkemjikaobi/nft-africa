import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import Link from 'next/link';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginPage = () => {
	return (
		<BasePageLayout>
			<div className='container w-600 text-center'>
				<h1 className='uppercase text-3xl tablet:text-5xl font-extrabold mb-4 mt-32'>
					Welcome
				</h1>
				<h4 className='font-bold mb-6 text-sm tablet:text-base'>
					Sign in to your account
				</h4>
				<div>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
						type='email'
						placeholder='Email Address'
					/>
				</div>
				<div>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black my-5'
						type='password'
						placeholder='Password'
					/>
					{/* <AiOutlineEye /> */}
				</div>
				<Link href='#'>
					<a
						href='#'
						className='text-right hover:text-blue-950 inline-block w-4/6'
					>
						Forgot Password?
					</a>
				</Link>
				<div className='flex justify-center'>
					<button className='bg-black flex items-center justify-center p-5 w-2/3 rounded-md text-white mt-4 hover:bg-white hover:text-black hover:border hover:border-black'>
						Sign In <BsArrowRight className='ml-4' />
					</button>
				</div>
				<div className='flex justify-center'>
					<button className='bg-white flex items-center justify-center p-5 w-2/3 border border-black rounded-md text-black my-5 hover:bg-black hover:text-white '>
						Create Account
					</button>
				</div>
			</div>
		</BasePageLayout>
	);
};

export default LoginPage;
