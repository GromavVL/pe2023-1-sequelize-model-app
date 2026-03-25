const { hashSync } = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models');

// const password = '123';
const HASH_SALT = 10;
// const passwordHash = hashSync(password, HASH_SALT);
// console.log('passwordHash :>> ', passwordHash);

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    body.passwordHash = hashSync(body.passwordHash, HASH_SALT);
    const createdUser = await User.create(body);
    if (!createdUser) {
      return res.status(400).send('Server Error');
    }

    // const preparedUser = { ...createdUser.get() };
    // delete preparedUser.passwordHash;
    // delete preparedUser.created_at;
    // delete preparedUser.updated_at;

    const preparedUser = _.omit(createdUser.get(), [
      'passwordHash',
      'updatedAt',
      'createdAt',
    ]);

    res.status(201).send(preparedUser);
  } catch (err) {
    console.log('err :>> ', err);
    next();
  }
};
module.exports.getUser = async (req, res, next) => {
  res.send('Hello');
};
module.exports.getUserByid = async (req, res, next) => {};
module.exports.updateUserById = async (req, res, next) => {};
module.exports.deleteUserById = async (req, res, next) => {};
