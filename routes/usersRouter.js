const { Router } = require('express');
const { usersController } = require('../controllers');
const { paginate, upload } = require('../middleware');

const usersRouter = Router();

usersRouter
  .route('/')
  .get(paginate.paginateUser, usersController.getUser)
  .post(usersController.createUser);

usersRouter
  .route('/:id')
  .get(usersController.getUserByid)
  .delete(usersController.deleteUserById)
  .patch(usersController.updateUserById)
  .put(usersController.updateOrCreateUsers, usersController.createUser);

usersRouter.get('/:id/tasks', usersController.getUserTask);

usersRouter.patch(
  '/:id/images',
  upload.uploadUserImage,
  usersController.updateUserImages
);

module.exports = usersRouter;
