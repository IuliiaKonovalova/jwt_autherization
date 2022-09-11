const express = require('express');
const cookie = require('cookie');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post('api/users/login', async(req, res) => {
  const { email, password } = req.body;

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/token/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body
    });

    const data = await apiRes.json();

    if (apiRes.status === 200) {
      res.setHeader('Set-Cookie', [
        cookie.serialize('access_token', data.access, {
          httpOnly: true,
          maxAge: 60 * 30,
          path: '/api/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        }),
        cookie.serialize('refresh_token', data.refresh, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          path: '/api/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        }),
      ]);
    }
    return res.status(200).json({ success: 'Login successful' }); 
  } catch (err) {
      
    }
});

module.exports = router
