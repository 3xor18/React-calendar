import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/eventsActions';
jest.mock(
	'../../../actions/eventsActions',
	() => ({
		eventStartDelete: jest.fn(),
	})
);

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<DeleteEventFab />
	</Provider>
);

describe('test en <DeleteEventFab />', () => {
	test('match con snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('Debe de llamar al eventStarDelete al hacer click', () => {
		wrapper.find('button').prop('onClick')();

		expect(eventStartDelete).toHaveBeenCalled();
	});
});
