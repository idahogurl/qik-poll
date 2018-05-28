import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    displayName: {
      field: 'display_name',
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: true,
      allowNull: false,
    },
    gravatar: {
      type: DataTypes.VIRTUAL,
      get: () => {
        if (!this.getDataValue('email')) {
          return 'https://gravatar.com/avatar/?s=200&d=retro';
        }
        const md5 = crypto.createHash('md5').update(this.getDataValue('email')).digest('hex');
        return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
      },
    },
  }, {
    underscored: true,
    paranoid: true,
    indexes: [{
      name: 'user_deleted_at_index',
      method: 'BTREE',
      fields: ['deleted_at'],
    },
    {
      name: 'user_email_index',
      method: 'BTREE',
      fields: ['email'],
    }],
  });

  User.associate = ({ poll, userSelection }) => {
    User.hasMany(poll);
    User.hasMany(userSelection);
  };

  User.comparePassword = (password, done) => {
    bcrypt.compare(password, this.getDataValue('password'), (err, isMatch) => {
      done(err, isMatch);
    });
  };

  return User;
};
