module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
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
    ],
  });
  Poll.associate = ({ User, PollOption }) => {
    Poll.belongsTo(User);
    Poll.hasMany(PollOption);
  };
  return Poll;
};
