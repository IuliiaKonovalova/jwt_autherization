const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

//route handler for express to handle requests to /api/users/login
// endpoint: /api/users/register
// will make a AJAX call to the backend to register a user
router.post('/api/users/register', async (req, res) => {
	const { first_name, last_name, email, password } = req.body;

	const body = JSON.stringify({
		first_name,
		last_name,
		email,
		password,
	});

	try {
    // on 8000
    // send request to backend
		const apiRes = await fetch(`${process.env.API_URL}/api/users/register`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});

		const data = await apiRes.json();

		return res.status(apiRes.status).json(data);
	} catch (err) {
		return res.status(500).json({
			error: 'Something went wrong when registering account',
		});
	}
});

module.exports = router;