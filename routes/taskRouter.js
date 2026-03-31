const Router = require('express');
const { tasksController } = require('../controllers');

const taskRouter = Router();

taskRouter.get('/', tasksController.getTasks);

module.exports = taskRouter;
