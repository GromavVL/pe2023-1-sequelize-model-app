const { Router } = require('express');
const usersRouter = require('./usersRouter');
const taskRouter = require('./taskRouter');

const router = Router();

router.use('/users', usersRouter);
router.use('/tasks', taskRouter);

module.exports = router;
