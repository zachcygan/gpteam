const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const fs = require('fs')
const path = require('path')

class User extends Model {
  checkPassword(loginPass) {
    return bcrypt.compareSync(loginPass, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    avatar_link: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: 'Click me to update your profile bio'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        const avatarOptions = path.join(__dirname, '..', 'public', 'assets', 'images', 'avatars');

        const avatarFile = fs.readdirSync(avatarOptions)

        const index = Math.floor(Math.random() * avatarFile.length)

        newUserData.avatar_link = path.join('/avatars', avatarFile[index])

        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    modelName: 'user',
  }
);

module.exports = User;