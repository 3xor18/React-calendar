import React from 'react';
import {
	useDispatch,
	useSelector,
} from 'react-redux';
import { starLogOut } from '../../actions/authAction';

export const NavBar = () => {
	const dispatch = useDispatch();
	const { name } = useSelector(
		(state) => state.auth
	);
	const handleLogout = () => {
		dispatch(starLogOut());
	};
	return (
		<div className="navbar navbar-dark  bg-dark mb-4">
			<span className="navbar-brand">
				{name}!!
			</span>
			<button
				className="btn btn-outline-danger"
				onClick={handleLogout}
			>
				<i className="fas fa-sign-out-alt"></i>
				<span className=""> Salir</span>
			</button>
		</div>
	);
};
