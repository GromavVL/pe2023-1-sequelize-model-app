const { Task } = require('./../models');

module.exports.getTasks = async (req, res, next) => {
  try {
    const foundTask = await Task.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: 'User',
    });

    res.status(200).send({ data: foundTask });
  } catch (err) {
    next(err);
  }
};
