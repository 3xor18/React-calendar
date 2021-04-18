import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import {
	startLogin,
	startRegister,
} from '../../../actions/authAction';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
	fire: jest.fn(),
}));

jest.mock('../../../actions/authAction', () => ({
	startLogin: jest.fn(),
	startRegister: jest.fn(),
}));

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<LoginScreen />
	</Provider>
);

describe('test en <LoginScreen />', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should be snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('debe llamar el dispath del login', () => {
		wrapper
			.find('input[name="lEmail"]')
			.simulate('change', {
				target: {
					name: 'lEmail',
					value: 'test@algo.com',
				},
			});
		wrapper
			.find('input[name="lPassword"]')
			.simulate('change', {
				target: {
					name: 'lPassword',
					value: '123456',
				},
			});

		wrapper.find('form').at(0).prop('onSubmit')({
			preventDefault() {},
		});

		expect(startLogin).toHaveBeenCalledWith(
			'test@algo.com',
			'123456'
		);
	});

	test('constraseñas no son iguales', () => {
		wrapper
			.find('input[name="rPassword"]')
			.simulate('change', {
				target: {
					name: 'rPassword',
					value: '123456',
				},
			});
		wrapper
			.find('input[name="rPassword2"]')
			.simulate('change', {
				target: {
					name: 'rPassword2',
					value: '1234567',
				},
			});

		wrapper.find('form').at(1).prop('onSubmit')({
			preventDefault() {},
		});

		expect(startRegister).not.toHaveBeenCalled();
		expect(Swal.fire).toHaveBeenCalled();
	});

	test('registro con pass iguales', () => {
		wrapper
			.find('input[name="rPassword"]')
			.simulate('change', {
				target: {
					name: 'rPassword',
					value: '123456',
				},
			});
		wrapper
			.find('input[name="rPassword2"]')
			.simulate('change', {
				target: {
					name: 'rPassword2',
					value: '123456',
				},
			});

		wrapper.find('form').at(1).prop('onSubmit')({
			preventDefault() {},
		});

		expect(startRegister).toHaveBeenCalled();
		expect(Swal.fire).not.toHaveBeenCalled();
	});
});
