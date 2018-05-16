import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      set: val => new Promise(((resolve, reject) => {
        if (!val) reject();
        bcrypt.genSalt(10, (genSaltErr, salt) => {
          bcrypt.hash(val, salt, null, (hashErr, hash) => {
            this.setDataValue('password', hash);
            resolve();
          });
        });
      })),
    },
    passwordResetToken: {
      field: 'password_reset_token',
      type: DataTypes.STRING,
    },
    passwordResetExpires: {
      field: 'password_reset_token',
      type: DataTypes.DATE,
    },
    gender: DataTypes.STRING,
    location: DataTypes.STRING,
    website: DataTypes.STRING,
    picture: DataTypes.STRING,
    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    google: DataTypes.STRING,
    vk: DataTypes.STRING,
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

  User.associate = ({ Poll, UserSelection }) => {
    User.hasMany(Poll);
    User.hasMany(UserSelection);
  };

  User.comparePassword = (password, done) => {
    bcrypt.compare(password, this.getDataValue('password'), (err, isMatch) => {
      done(err, isMatch);
    });
  };

  return User;
};
