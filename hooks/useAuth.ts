import { useContext } from 'react';
import AuthContext from 'context/auth/AuthContext';

/**
 * This is a hook to return all (functions / methods) and state variables in the auth context provider
 * Prevents reimports and repititions of useContext and the auth context
 * @returns
 */
const useAuth = () => {
	const {
		//methods
		registerUser,

		//state variables
		token,
		isAuthenticated,
		loading,
		user,
	} = useContext(AuthContext);

	return {
		//methods
		registerUser,

		//state variables
		token,
		isAuthenticated,
		loading,
		user,
	};
};

export default useAuth;
