import {
	uiCloseModalAction,
	uiOpenModalAction,
} from '../../actions/uiAction';
import { uiReducer } from '../../reducers/uiReducer';

const initialState = {
	modalOpen: false,
};

describe('test en uiReducer', () => {
	test('debe de retonar el estado por defecto', () => {
		const state = uiReducer(
			initialState,
			'Algo no conrolado'
		);
		expect(state).toEqual(initialState);
	});

	test('debe Abrir y cerrar el modal', () => {
		const modalOpen = uiOpenModalAction();
		const modalClose = uiCloseModalAction();

		let state = uiReducer(
			initialState,
			modalOpen
		);
		expect(state).toEqual({
			modalOpen: true,
		});

		state = uiReducer(initialState, modalClose);

		expect(state).toEqual({
			modalOpen: false,
		});
	});
});
