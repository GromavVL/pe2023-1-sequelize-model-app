const { hashSync } = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models');
const { where } = require('sequelize');

// const password = '123';
// const passwordHash = hashSync(password, HASH_SALT);
// console.log('passwordHash :>> ', passwordHash);

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    // body.passwordHash = hashSync(body.passwordHash, HASH_SALT);
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
    next(err);
  }
};
module.exports.getUser = async (req, res, next) => {
  const { limit, offset } = req.pagination;
  try {
    const foundUser = await User.findAll({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt', 'passwordHash'] },
      limit,
      offset,
      order: ['id'],
    });
    res.status(200).send({
      date: foundUser,
    });
  } catch (err) {
    console.log('err :>> ', err);
    next(err);
  }
};
module.exports.getUserByid = async (req, res, next) => {
  const { id } = req.params;
  console.log('req.params :>> ', req.params);
  try {
    const foundUser = await User.findByPk(id, {
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt', 'passwordHash'] },
    });

    if (!foundUser) {
      return res.status(404).send('Server Error');
    }
    res.status(200).send({ data: foundUser });
  } catch (err) {
    console.log('err :>> ', err);
    next(err);
  }
};
module.exports.updateUserById = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  try {
    const [updatesUserCount, updatedUsers] = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatesUserCount) {
      return res.status(404).send([{ status: 404, title: 'Not Found' }]);
    }
    res.status(200).send({ data: updatedUsers[0] });
  } catch (err) {
    next(err);
  }
};
module.exports.updateOrCreateUsers = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  console.log('body :>> ', body, { id });
  try {
    const [updateUserCount, [updateUser]] = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updateUserCount) {
      body.id = id;
      return next();
    }
    const preparedUser = _.omit(updateUser.get(), [
      'passwordHash',
      'updatedAt',
      'createdAt',
    ]);
    res.status(201).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteUsers = await User.destroy({ where: { id } });

    if (!deleteUsers) {
      return res.status(404).send([{ status: 404, title: 'Not Found' }]);
    }
    res.status(202).end();
  } catch (err) {
    next(err);
  }
};
