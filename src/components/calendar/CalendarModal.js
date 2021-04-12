import React, {
	useEffect,
	useState,
} from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uiCloseModalAction } from '../../actions/uiAction';
import {
	eventAddNewEvent,
	eventClearActiveNote,
	eventUpdated,
} from '../../actions/eventsActions';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const now = moment()
	.minutes(0)
	.seconds(0)
	.add(1, 'hours');
const endC = moment()
	.minutes(0)
	.seconds(0)
	.add(2, 'hours');

const initEvent = {
	title: '',
	notes: '',
	start: now.toDate(),
	end: endC.toDate(),
};

export const CalendarModal = () => {
	const dispatch = useDispatch();
	const { modalOpen } = useSelector(
		(state) => state.ui
	);
	const { activeEvent } = useSelector(
		(state) => state.calendar
	);

	const [dateStart, setDateStart] = useState(
		now.toDate()
	);

	const [dateEnd, setDateEnd] = useState(
		endC.toDate()
	);

	const [titleValid, setTitleValid] = useState(
		true
	);

	const [formValues, setFormValues] = useState(
		initEvent
	);

	const { title, notes, start, end } = formValues;

	useEffect(() => {
		if (activeEvent) {
			setFormValues(activeEvent);
		} else {
			setFormValues(initEvent);
		}
	}, [activeEvent, setFormValues]);

	const handleInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const closeModal = () => {
		dispatch(uiCloseModalAction());
		dispatch(eventClearActiveNote());
		setFormValues(initEvent);
	};

	const handleStartDateChange = (e) => {
		setDateStart(e);
		setFormValues({ ...formValues, start: e });
	};

	const handleEndDateChange = (e) => {
		setDateEnd(e);
		setFormValues({ ...formValues, end: e });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const momentStart = moment(start);
		const momentEnd = moment(end);
		if (momentStart.isSameOrAfter(momentEnd)) {
			return Swal.fire(
				'Error',
				'Fecha fin debe ser mayor al inicio',
				'error'
			);
		}
		if (title.trim().length < 2) {
			console.log('invalid Title');
			return setTitleValid(false);
		}
		if (activeEvent) {
			dispatch(eventUpdated(formValues));
		} else {
			dispatch(
				eventAddNewEvent({
					...formValues,
					id: new Date().getTime(),
					user: {
						_id: 1234,
						name: 'Gerson',
					},
				})
			);
		}

		setTitleValid(true);
		closeModal();
	};

	return (
		<Modal
			isOpen={modalOpen}
			//onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
			ariaHideApp={false}
		>
			<h1>
				{activeEvent
					? 'Editando evento'
					: 'Nuevo evento'}
			</h1>
			<hr />
			<form
				className="container"
				onSubmit={handleSubmit}
			>
				<div className="form-group">
					<label>Fecha y hora inicio</label>
					<DateTimePicker
						onChange={handleStartDateChange}
						value={dateStart}
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label>Fecha y hora fin</label>
					<DateTimePicker
						onChange={handleEndDateChange}
						value={dateEnd}
						className="form-control"
						minDate={dateStart}
					/>
				</div>

				<hr />
				<div className="form-group">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={`form-control ${
							!titleValid && 'is-invalid'
						}`}
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						value={title}
						onChange={handleInputChange}
					/>
					<small
						id="emailHelp"
						className="form-text text-muted"
					>
						Una descripción corta
					</small>
				</div>

				<div className="form-group">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						value={notes}
						onChange={handleInputChange}
					></textarea>
					<small
						id="emailHelp"
						className="form-text text-muted"
					>
						Información adicional
					</small>
				</div>

				<button
					type="submit"
					className="btn btn-outline-primary btn-block"
				>
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};
