const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  console.log('body :>> ', body);
  try {
    const createdUser = await User.create(body);

    if (!createdUser) {
      return res.status(400).send('Server Error');
    }
    res.status(201).send(createdUser);
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
