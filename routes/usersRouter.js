const { Router } = require('express');
const { usersController } = require('../controllers');
const { paginate } = require('../middleware');

const { STATIC_PATCH } = require('./../constants');
const patch = require('path');
const multer = require('multer');
const upload = multer({ dest: patch.join(STATIC_PATCH, 'images') });

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

usersRouter.patch('/:id/images', upload.single('userPhoto'));

module.exports = usersRouter;
