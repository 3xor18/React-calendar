const { types } = require('../types/types.js');
const initialState = {
	checking: true,
	// uid:null,
	// name:null
};

const initialAction = {};

export const authReducer = (
	state = initialState,
	action = initialAction
) => {
	switch (action.type) {
		case types.authStartRegister:
		case types.authLogin:
			return {
				...state,
				checking: false,
				...action.payload,
			};

		case types.authCheckingFinish:
			return { ...state, checking: false };

		case types.authLogout:
			return {
				checking: false,
			};

		default:
			return state;
	}
};
