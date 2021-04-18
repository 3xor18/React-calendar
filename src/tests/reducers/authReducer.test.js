import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initialState = {
	checking: true,
	// uid:null,
	// name:null
};

describe('test en authReducer', () => {
	test('state por defecto', () => {
		const state = authReducer(initialState, {});
		expect(state).toEqual(initialState);
	});

	test('debe auth el usuario', () => {
		const action = {
			type: types.authLogin,
			payload: {
				uid: '123',
				name: 'gerson',
			},
		};

		const state = authReducer(
			initialState,
			action
		);
		expect(state).toEqual({
			checking: false,
			uid: '123',
			name: 'gerson',
		});
	});
});
