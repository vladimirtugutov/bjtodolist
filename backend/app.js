const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pgSessionStore = require('connect-pg-simple')(session);
require('dotenv').config();

const port = process.env.PORT;

const app = express();

// Импортируем routers
const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(
  session({
    name: 'sid',
    // eslint-disable-next-line new-cap
    store: new pgSessionStore({
      conString:
        process.env.DB_TL === 'production'
          ? process.env.DB_TL
          : process.env.DB_TL,
    }),
    secret: process.env.STR,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 10, // время жизни cookies, ms (10 дней)
    },
  }),
);

app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);

app.listen(port, () => console.log('server working'));
