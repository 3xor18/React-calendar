import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { AppRouter } from '../../routers/AppRouter';

const middleWares = [thunk];
const mockStore = configureStore(middleWares);

//store.dispatch = jest.fn();

describe('test en AppRouter', () => {
	test('Debe de mostrar espere', () => {
		const initState = {
			auth: { checking: true },
		};
		const store = mockStore(initState);
		const wrapper = mount(
			<Provider store={store}>
				<AppRouter />
			</Provider>
		);
		expect(wrapper).toMatchSnapshot();
		expect(
			wrapper.find('h5').exists()
		).toBeTruthy();
	});

	test('debe de mostrar la ruta publica', () => {
		const initState = {
			auth: { checking: false, uid: null },
		};
		const store = mockStore(initState);
		const wrapper = mount(
			<Provider store={store}>
				<AppRouter />
			</Provider>
		);
		expect(wrapper).toMatchSnapshot();
		expect(
			wrapper.find('.login-container').exists()
		).toBeTruthy();
	});

	test('debe de mostrar la ruta privada', () => {
		const initState = {
			calendar: { events: [] },
			auth: {
				checking: false,
				uid: '123',
				name: 'test',
			},
			uid: '123',
			ui: { modalOpen: false },
		};
		const store = mockStore(initState);
		const wrapper = mount(
			<Provider store={store}>
				<AppRouter />
			</Provider>
		);
		expect(wrapper).toMatchSnapshot();
		expect(
			wrapper.find('.calendar-screen').exists()
		).toBeTruthy();
	});
});
