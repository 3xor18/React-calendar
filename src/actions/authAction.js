import Swal from 'sweetalert2';
import {
	fetchConToken,
	fetchSinToken,
} from '../helpers/fecth';
import { types } from '../types/types';
import { eventLogOut } from './eventsActions';

export const startLogin = (email, password) => {
	return async (dispatch) => {
		const resp = await fetchSinToken(
			'auth',
			{
				email,
				password,
			},
			'POST'
		);
		const body = await resp.json();
		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem(
				'token-init-date',
				new Date().getTime()
			);
			dispatch(
				login({
					uid: body.user.uid,
					name: body.user.name,
				})
			);
		} else {
			console.log(body.error);
			let error;
			if (body.errors?.email)
				error = body.errors.email.msg;
			else error = body.error;
			Swal.fire('Error', error, 'error');
		}
	};
};

const login = (user) => {
	return {
		type: types.authLogin,
		payload: user,
	};
};

export const startRegister = (
	name,
	email,
	password
) => {
	return async (dispatch) => {
		const resp = await fetchSinToken(
			'auth/new',
			{
				name,
				email,
				password,
			},
			'POST'
		);
		const body = await resp.json();
		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem(
				'token-init-date',
				new Date().getTime()
			);
			console.log(body.user);
			dispatch(
				login({
					uid: body.user._id,
					name: body.user.name,
				})
			);
		} else {
			let error;
			if (body.errors?.email)
				error = body.errors.email.msg;
			if (body.errors?.password)
				error = body.errors.password.msg;
			else error = body.error;
			Swal.fire('Error', error, 'error');
		}
	};
};

export const startChecking = () => {
	return async (dispatch) => {
		const resp = await fetchConToken(
			'auth/renew',
			{}
		);
		const body = await resp.json();
		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem(
				'token-init-date',
				new Date().getTime()
			);
			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			dispatch(checkingFinish());
		}
	};
};

const checkingFinish = () => ({
	type: types.authCheckingFinish,
});

export const starLogOut = () => {
	return (dispatch) => {
		localStorage.clear();
		dispatch(eventLogOut());
		dispatch(logOut());
	};
};

const logOut = () => ({
	type: types.authLogout,
});
