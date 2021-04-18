import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/eventsActions';
import { act } from '@testing-library/react';

jest.mock(
	'../../../actions/eventsActions',
	() => ({
		eventSetActive: jest.fn(),
		eventStartLoading: jest.fn(),
	})
);
Storage.prototype.setItem = jest.fn();

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const initState = {
	calendar: { events: [] },
	auth: {
		uid: '123',
		name: 'test',
	},
	ui: {
		modalOpen: false,
	},
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<CalendarScreen />
	</Provider>
);

describe('test en CalendarScreen', () => {
	test('debe mostrarse corectamente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('interacciones on el calendar', () => {
		const calendar = wrapper.find('Calendar');
		const calendarMessages = calendar.prop(
			'messages'
		);
		expect(calendarMessages).toEqual(messages);

		calendar.prop('onDoubleClickEvent')();
		expect(store.dispatch).toHaveBeenCalledWith({
			type: types.uiOpenModal,
		});

		calendar.prop('onSelectEvent')({
			start: 'hoy',
		});
		expect(eventSetActive).toHaveBeenCalledWith({
			start: 'hoy',
		});

		act(() => {
			calendar.prop('onView')('week');
			expect(
				localStorage.setItem
			).toHaveBeenCalledWith('lastView', 'week');
		});
	});
});
