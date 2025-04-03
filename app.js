import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

// ✅ Import custom routes
import meetingRouter from './routes/meetingRoute.js';
import memberRouter from './routes/memberRoute.js';

const app = express();

// ✅ View engine setup
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// ✅ Custom routes
app.use('/meetings', meetingRouter);
app.use('/members', memberRouter);

// ✅ Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// ✅ Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
