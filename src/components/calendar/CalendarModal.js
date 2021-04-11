import React from 'react';
import Modal from 'react-modal';
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

export const CalendarModal = () => {
	return (
		<Modal
			isOpen={true}
			//onAfterOpen={afterOpenModal}
			//onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<h1>Hello!</h1>
			<hr />
			<span>Aqui estoy</span>
		</Modal>
	);
};
