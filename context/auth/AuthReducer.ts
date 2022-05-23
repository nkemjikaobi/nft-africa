import { REGISTER_USER, REGISTER_FAIL } from '../types';

const AuthReducer = (state: any, action: any) => {
	switch (action.type) {
		case REGISTER_USER:
			return {
				...state,
				loading: false,
			};
		case REGISTER_FAIL:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};
export default AuthReducer;
