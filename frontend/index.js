const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

// routers handlers for express
const loginRouter = require('./routes/auth/login');
const logoutRouter = require('./routes/auth/logout');
const meRouter = require('./routes/auth/me');
const registerRouter = require('./routes/auth/register');
const verifyRouter = require('./routes/auth/verify');


const app = express();

app.use(express.json());
app.use(cookieParser());

// hook with app
app.use(loginRouter);
app.use(logoutRouter);
app.use(meRouter);
app.use(registerRouter);
app.use(verifyRouter);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
  const myPath = path.resolve(__dirname, 'client', 'build', 'index.html');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});