const patch = require('path');

module.exports = CONSTANTS = {
  GENDERS: ['male', 'female', 'other'],
  HASH_SALT: 10,
  STATIC_PATCH: patch.join(__dirname, process.env.STATIC_FOLDER),
};
