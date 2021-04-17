import React, {
	useEffect,
	useState,
} from 'react';
import {
	Calendar,
	momentLocalizer,
} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import {
	useDispatch,
	useSelector,
} from 'react-redux';
import { uiOpenModalAction } from '../../actions/uiAction';
import {
	eventSetActive,
	eventStartLoading,
} from '../../actions/eventsActions';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { eventClearActiveNote } from '../../actions/eventsActions';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
	const { uid } = useSelector(
		(state) => state.auth
	);
	const { activeEvent } = useSelector(
		(state) => state.calendar
	);
	const dispatch = useDispatch();
	const { events } = useSelector(
		(state) => state.calendar
	);

	useEffect(() => {
		dispatch(eventStartLoading());
	}, [dispatch]);

	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'month'
	);

	const onDoubleClick = (e) => {
		dispatch(uiOpenModalAction());
	};

	const onSelectEvent = (e) => {
		dispatch(eventSetActive(e));
	};

	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	};

	const onSelectSlot = (e) => {
		console.log(e);
		//TODO: hacer evento
		dispatch(eventClearActiveNote());
	};

	const eventStyleGetter = (
		event,
		start,
		end,
		inSelect
	) => {
		const style = {
			backgroundColor:
				uid === event.user._id
					? '#367CF7'
					: '#465660',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: 'white',
		};
		return { style };
	};

	return (
		<div className="calendar-screen">
			<NavBar />

			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
				onDoubleClickEvent={onDoubleClick}
				eventPropGetter={eventStyleGetter}
				components={{ event: CalendarEvent }}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
				view={lastView}
				onSelectSlot={onSelectSlot}
				selectable={true}
			/>
			<AddNewFab />
			{activeEvent && <DeleteEventFab />}

			<CalendarModal />
		</div>
	);
};
