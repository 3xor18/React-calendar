import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fecth';
import { prepareEvents } from '../helpers/prepareEvents';
import { types } from '../types/types';

const eventAddNewEvent = (event) => ({
	type: types.eventAddNew,
	payload: event,
});

export const eventSetActive = (event) => ({
	type: types.eventSetActive,
	payload: event,
});

export const eventClearActiveNote = () => ({
	type: types.eventClearActiveEvent,
});

//acciones
export const eventStartAddNew = (event) => {
	return async (dispatch, getState) => {
		console.log('event30:', event);
		const { uid, name } = getState().auth;
		try {
			const resp = await fetchConToken(
				'events',
				event,
				'POST'
			);
			const body = await resp.json();
			if (body.ok) {
				event.id = body.event.id;
				event.user = { _id: uid, name: name };
				console.log('event42:', event);
				dispatch(eventAddNewEvent(event));
			}
		} catch (error) {
			console.error(error);
		}
	};
};

export const eventStartLoading = () => {
	return async (dispatch) => {
		try {
			const resp = await fetchConToken('events');
			const body = await resp.json();

			const events = prepareEvents(body.eventos);

			dispatch(eventLoaded(events));
		} catch (error) {
			console.error(error);
		}
	};
};

const eventLoaded = (events) => ({
	type: types.eventLoaded,
	payload: events,
});

export const eventStartUpdate = (event) => {
	return async (dispatch) => {
		try {
			const resp = await fetchConToken(
				`events/${event.id}`,
				event,
				'PUT'
			);
			const body = await resp.json();

			if (body.ok) {
				dispatch(eventUpdated(event));
			} else {
				Swal.fire('Error', body.msg, 'error');
			}
		} catch (error) {
			console.error(error);
		}
	};
};

const eventUpdated = (event) => ({
	type: types.eventUpdated,
	payload: event,
});

export const eventStartDelete = () => {
	return async (dispatch, getState) => {
		try {
			const {
				id,
			} = getState().calendar.activeEvent;
			const resp = await fetchConToken(
				`events/${id}`,
				{},
				'DELETE'
			);
			const body = await resp.json();

			if (body.ok) {
				dispatch(eventDeleted());
			} else {
				Swal.fire('Error', body.msg, 'error');
			}
		} catch (error) {
			console.error(error);
		}
	};
};

const eventDeleted = () => ({
	type: types.eventDeleted,
});

export const eventLogOut = () => ({
	type: types.eventLogOut,
});
