const { Router } = require('express');
const { usersController } = require('../controllers');
const { paginate } = require('../middleware');

const usersRouter = Router();

usersRouter
  .route('/')
  .get(paginate.paginateUser, usersController.getUser)
  .post(usersController.createUser);
console.log('paginate.paginateUser, :>> ', paginate.paginateUser);
usersRouter
  .route('/:id')
  .get(usersController.getUserByid)
  .delete(usersController.deleteUserById)
  .patch(usersController.updateUserById);

module.exports = usersRouter;
