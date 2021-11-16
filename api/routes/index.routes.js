// const testRouter = require('./../tests/server.test')
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router')
const categoriesRouter = require('./categories/categories-router');
const classesRouter = require('./classes/classes-router');
const mw = require('../middleware/routes/mw.routes')

module.exports = server => {
  // server.use('/', testRouter);
  server.use('/api/auth', authRouter);
  server.use('/api/users', mw.restrictedAccess, usersRouter);
  server.use('/api/categories', mw.restrictedAccess, categoriesRouter);
  server.use('/api/classes', mw.restrictedAccess, classesRouter);
};