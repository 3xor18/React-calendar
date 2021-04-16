import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import {
	startLogin,
	startRegister,
} from '../../actions/authAction';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
	const dispatch = useDispatch();
	//Login
	const [
		formLoginValues,
		handleLoginInputChange,
	] = useForm({
		lEmail: '3xor@gmail.com',
		lPassword: '123456',
	});
	//register
	const [
		formRegisterValues,
		handleRegisterInputChange,
	] = useForm({
		rEmail: '3xor@gmail.com',
		rPassword: '123456',
		rPassword2: '123456',
		rName: '3xor',
	});

	const { lEmail, lPassword } = formLoginValues;
	const {
		rEmail,
		rPassword,
		rPassword2,
		rName,
	} = formRegisterValues;

	const handleLogin = (e) => {
		e.preventDefault();
		const email = lEmail;
		const password = lPassword;
		dispatch(startLogin(email, password));
	};

	const handleRegister = (e) => {
		e.preventDefault();
		const email = rEmail;
		const password = rPassword;
		const password2 = rPassword2;
		const name = rName;
		if (password !== password2) {
			return Swal.fire(
				'Error',
				'Clave no son Iguales',
				'error'
			);
		}
		dispatch(
			startRegister(name, email, password)
		);
	};

	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Ingreso</h3>
					<form onSubmit={handleLogin}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Correo"
								name="lEmail"
								onChange={handleLoginInputChange}
								value={lEmail}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="lPassword"
								onChange={handleLoginInputChange}
								value={lPassword}
							/>
						</div>
						<div className="form-group">
							<input
								type="submit"
								className="btnSubmit"
								value="Login"
							/>
						</div>
					</form>
				</div>

				<div className="col-md-6 login-form-2">
					<h3>Registro</h3>
					<form onSubmit={handleRegister}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
								name="rName"
								onChange={
									handleRegisterInputChange
								}
								value={rName}
							/>
						</div>
						<div className="form-group">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
								name="rEmail"
								onChange={
									handleRegisterInputChange
								}
								value={rEmail}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="rPassword"
								onChange={
									handleRegisterInputChange
								}
								value={rPassword}
							/>
						</div>

						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Repita la contraseña"
								name="rPassword2"
								onChange={
									handleRegisterInputChange
								}
								value={rPassword2}
							/>
						</div>

						<div className="form-group">
							<input
								type="submit"
								className="btnSubmit"
								value="Crear cuenta"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
