module.exports = (sequelize, DataTypes) => {
  const UserSelection = sequelize.define('userSelection', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    pollOptionId: {
      type: DataTypes.UUID,
      field: 'poll_option_id',
      references: {
        model: 'poll',
        key: 'id',
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'user_selections',
    indexes: [{
      name: 'user_selection_poll_option_id_index',
      method: 'BTREE',
      fields: ['poll_option_id'],
    },
    {
      name: 'user_selection_user_id_index',
      method: 'BTREE',
      fields: ['user_id'],
    },
    ],
  });
  UserSelection.associate = ({ User, PollOption }) => {
    UserSelection.belongsTo(User);
    UserSelection.belongsTo(PollOption);
  };
  return UserSelection;
};
