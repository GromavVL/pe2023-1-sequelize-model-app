'use strict';
const { Model } = require('sequelize');
const { hashSync } = require('bcrypt');
const { GENDERS } = require('../constants');
const { HASH_SALT } = require('../constants');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          is: /^[A-Z][a-z]+$/,
          len: [2, 64],
        },
      },
      lastName: {
        type: DataTypes.STRING(64),
        validate: {
          is: /^[A-Z][a-z]+$/,
          len: [2, 64],
        },
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        set (value) {
          this.setDataValue('passwordHash', hashSync(value, HASH_SALT));
        },
      },
      gender: {
        type: DataTypes.STRING(10),
        validate: {
          isIn: [GENDERS],
        },
      },
      image: DataTypes.STRING(255),
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  );
  return User;
};
