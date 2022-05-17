import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { REGISTER_USER, REGISTER_FAIL, LOGIN_USER, LOGIN_FAIL } from '../types';
import axios from 'axios';

const AuthState = (props: any) => {
	const initialState = {
		token: null,
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const registerUser = async () => {
		try {
			//
		} catch (error) {}
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				registerUser,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
