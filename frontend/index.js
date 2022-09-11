const express = require('express');
const path = require('path');

require('dotenv').config();

const loginRouter = require('./routes/auth/login');
const meRouter = require('./routes/auth/me');
const registerRouter = require('./routes/auth/register');


const app = express();

app.use(express.json());

app.use(loginRouter);
app.use(meRouter);
app.use(registerRouter);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
  const myPath = path.resolve(__dirname, 'client', 'build', 'index.html');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});