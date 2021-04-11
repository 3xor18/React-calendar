import React, { useState } from 'react';
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

moment.locale('es');
const localizer = momentLocalizer(moment);
const events = [
	{
		title: 'Cumpleaños del jefe',
		start: moment().toDate(),
		end: moment().add(2, 'hours').toDate(),
		bgcolor: '#fafafa',
		notes: 'Comprar regalo',
		user: {
			name: '3xor',
		},
	},
];

export const CalendarScreen = () => {
	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'month'
	);
	const onDoubleClick = (e) => {
		console.log(e);
	};

	const onSelectEvent = (e) => {
		console.log(e);
	};

	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	};

	const eventStyleGetter = (
		event,
		start,
		end,
		inSelect
	) => {
		const style = {
			backgroundColor: '#367CF7',
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
				eventPropGetter={eventStyleGetter}
				components={{ event: CalendarEvent }}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
				view={lastView}
			/>
			<CalendarModal />
		</div>
	);
};
