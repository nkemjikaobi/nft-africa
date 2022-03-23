import BasePageLayout from 'components/BasePageLayout/BasePageLayout';
import Link from 'next/link';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';

const SignUpPage = () => {
	return (
		<BasePageLayout>
			<div className='tablet:container tablet:w-600 text-center'>
				<h1 className='uppercase text-base tablet:text-3xl font-extrabold mb-4 mt-32'>
					Sign Up
				</h1>
				<h4 className='font-bold mb-6 text-sm tablet:text-base'>
					For an NFT Art Account
				</h4>
				<div>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black'
						type='email'
						placeholder='Email Address'
					/>
				</div>
				<div className='relative'>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black my-5'
						type='password'
						placeholder='Password'
					/>
					<AiOutlineEye className='absolute top-10 right-20 tablet:right-32  text-2xl' />
				</div>
				<div className='relative'>
					<input
						className='bg-gray-200 p-5 border border-gray-300 rounded-md w-2/3 focus:border-black focus:outline-black my-5'
						type='password'
						placeholder='Confirm Password'
					/>
					<AiOutlineEye className='absolute top-10 right-20 tablet:right-32  text-2xl' />
				</div>
				<div className='flex justify-center'>
					<Link href='#'>
						<a
							href='#'
							className='bg-black flex items-center justify-center p-5 w-2/3 rounded-md text-white mt-4 hover:bg-white hover:text-black hover:border hover:border-black'
						>
							{' '}
							Sign Up <BsArrowRight className='ml-4' />
						</a>
					</Link>
				</div>
				<div className='flex justify-center'>
					<Link href='/auth/login'>
						<a
							href='#'
							className='bg-white flex items-center justify-center p-5 w-2/3 border border-black rounded-md text-black my-5 hover:bg-black hover:text-white '
						>
							Have an Account? Sign In
						</a>
					</Link>
				</div>
				<div className='flex justify-center'>
					<Link href='#'>
						<a
							href='#'
							className='bg-black flex items-center justify-center p-5 w-2/3 rounded-md text-white mt-4 hover:bg-white hover:text-black hover:border hover:border-black'
						>
							{' '}
							Sign Up <BsArrowRight className='ml-4' />
						</a>
					</Link>
				</div>
				<div className='flex justify-center'>
					<Link href='/auth/login'>
						<a
							href='#'
							className='bg-white flex items-center justify-center p-5 w-2/3 border border-black rounded-md text-black my-5 hover:bg-black hover:text-white '
						>
							Have an Account? Sign In
						</a>
					</Link>
				</div>
				<div className='flex justify-center'>
					<Link href='#'>
						<a
							href='#'
							className='bg-black flex items-center justify-center p-5 w-2/3 rounded-md text-white mt-4 hover:bg-white hover:text-black hover:border hover:border-black'
						>
							{' '}
							Sign Up <BsArrowRight className='ml-4' />
						</a>
					</Link>
				</div>
				<div className='flex justify-center'>
					<Link href='/auth/login'>
						<a
							href='#'
							className='bg-white flex items-center justify-center p-5 w-2/3 border border-black rounded-md text-black my-5 hover:bg-black hover:text-white '
						>
							Have an Account? Sign In
						</a>
					</Link>
				</div>
			</div>
		</BasePageLayout>
	);
};

export default SignUpPage;
