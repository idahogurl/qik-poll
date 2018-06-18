module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    },
    prompt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      default: 0,
    },
  }, {
    underscored: true,
    paranoid: true,
    indexes: [{
      name: 'poll_deleted_at_index',
      method: 'BTREE',
      fields: ['deleted_at'],
    }, {
      name: 'poll_user_id_index',
      method: 'BTREE',
      fields: ['user_id'],
    },
    {
      name: 'poll_published_index',
      method: 'BTREE',
      fields: ['published'],
    },
    ],
  });
  Poll.associate = ({ User, PollOption }) => {
    Poll.belongsTo(User);
    Poll.hasMany(PollOption);
  };
  return Poll;
};
