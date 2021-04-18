import {
	fetchConToken,
	fetchSinToken,
} from '../../helpers/fecth';

describe('test on fetch.js', () => {
	let token;
	test('fetch sin token debe funcionar', async () => {
		const resp = await fetchSinToken(
			'auth',
			{
				email: '3xor@gmail.com',
				password: '123456',
			},
			'POST'
		);
		const body = await resp.json();
		expect(resp instanceof Response).toBe(true);
		expect(body.ok).toBe(true);
		token = body.token;
	});

	test('Con token', async () => {
		const errorExpected =
			'Evento no existe en bd';

		localStorage.setItem('token', token);

		const resp = await fetchConToken(
			`events/60789e358a5f637b35c8c845`,
			{},
			'DELETE'
		);
		const body = await resp.json();

		expect(body.msg).toEqual(errorExpected);
	});
});
