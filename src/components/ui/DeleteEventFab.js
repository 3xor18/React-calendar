import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/eventsActions';

export const DeleteEventFab = () => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(eventStartDelete());
	};

	return (
		<button
			className="btn btn-danger fab-danger"
			onClick={handleDelete}
		>
			<i className="fa fa-trash"></i>
			<span className="">Borrar Evento</span>
		</button>
	);
};
