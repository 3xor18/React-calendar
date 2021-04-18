import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import {
	startChecking,
	startLogin,
	startRegister,
} from '../../actions/authAction';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers//fecth';
jest.mock('sweetalert2', () => ({
	fire: jest.fn(),
}));

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const initState = {};
let store = mockStore(initState);

//mock store
Storage.prototype.setItem = jest.fn();

let token;

describe('authAction test', () => {
	beforeEach(() => {
		store = mockStore(initState);
		jest.clearAllMocks();
	});

	test('startLogin success', async () => {
		await store.dispatch(
			startLogin('3xor@gmail.com', '123456')
		);
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.authLogin,
			payload: {
				uid: expect.any(String),
				name: expect.any(String),
			},
		});

		expect(
			localStorage.setItem
		).toHaveBeenCalledWith(
			'token',
			expect.any(String)
		);

		expect(
			localStorage.setItem
		).toHaveBeenCalledWith(
			'token-init-date',
			expect.any(Number)
		);

		token = localStorage.setItem.mock.calls[0][1];
	});

	test('StartLogin not success', async () => {
		await store.dispatch(
			startLogin('3xor@gmail.com', '123456a')
		);

		const actions = store.getActions();
		expect(actions).toEqual([]);
		expect(Swal.fire).toHaveBeenCalled();
	});

	test('StartRegister Success', async () => {
		fetchModule.fetchSinToken = jest.fn(() => ({
			json() {
				return {
					ok: true,
					_id: '1234',
					uid: '12345',
					name: 'mock',
					token: 'ABC',
					user: {
						_id: '1234',
						uid: '12345',
						name: 'mock',
					},
				};
			},
		}));
		await store.dispatch(
			startRegister(
				'test@test.com',
				'123456',
				'test'
			)
		);
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.authLogin,
			payload: {
				uid: expect.any(String),
				name: expect.any(String),
			},
		});

		expect(
			localStorage.setItem
		).toHaveBeenCalledWith('token', 'ABC');
	});

	test('startChecking successFull', async () => {
		fetchModule.fetchConToken = jest.fn(() => ({
			json() {
				return {
					ok: true,
					_id: '1234',
					uid: '12345',
					name: 'mock',
					token: 'ABC',
					user: {
						_id: '1234',
						uid: '12345',
						name: 'mock',
					},
				};
			},
		}));

		await store.dispatch(startChecking());
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: types.authLogin,
			payload: {
				uid: expect.any(String),
				name: expect.any(String),
			},
		});

		expect(
			localStorage.setItem
		).toHaveBeenCalledWith('token', 'ABC');
	});
});
