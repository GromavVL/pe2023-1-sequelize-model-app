const { Router } = require('express');
const { usersController } = require('../controllers');

const usersRouter = Router();

usersRouter
  .route('/')
  .get(usersController.getUser)
  .post(usersController.createUser);

usersRouter
  .route('/:id')
  .get(usersController.getUserByid)
  .delete(usersController.deleteUserById)
  .patch(usersController.updateUserById);

module.exports = usersRouter;
