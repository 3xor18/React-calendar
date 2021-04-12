import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModalAction } from '../../actions/uiAction';

export const AddNewFab = () => {
	const dispatch = useDispatch();
	const openModal = (e) => {
		dispatch(uiOpenModalAction());
	};
	return (
		<button
			className="btn btn-primary fab"
			onClick={openModal}
		>
			<i className="fas fa-plus"></i>
		</button>
	);
};
