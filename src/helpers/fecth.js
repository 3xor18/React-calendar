const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = (
	endPoint,
	data,
	method = 'GET'
) => {
	const url = `${baseUrl}/${endPoint}`;

	if (method === 'GET') {
		return fetch(url);
	}
	return fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
};

export const fetchConToken = (
	endPoint,
	data,
	method = 'GET'
) => {
	const url = `${baseUrl}/${endPoint}`;
	const token =
		localStorage.getItem('token') || '';

	if (method === 'GET') {
		return fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json',
				'x-token': token,
			},
		});
	}
	return fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'x-token': token,
		},
		body: JSON.stringify(data),
	});
};
