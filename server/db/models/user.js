import { models } from '@next-auth/sequelize-adapter';

export default function UserModel(sequelize) {
  const User = sequelize.define('User', {
    ...models.User,
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  });

  User.associate = ({ Poll }) => {
    User.hasMany(Poll);
  };

  return User;
}
