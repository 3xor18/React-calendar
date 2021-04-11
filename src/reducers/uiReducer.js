import { types } from '../types/types';

const initialState = {
	modalOpen: false,
};

const initialAction = {};

export const uiReducer = (
	state = initialState,
	action = initialAction
) => {
	switch (action.type) {
		case types.uiOpenModal:
			return { ...state, modalOpen: true };

		case types.uiCloseModal:
			return { ...state, modalOpen: false };

		default:
			return state;
	}
};
