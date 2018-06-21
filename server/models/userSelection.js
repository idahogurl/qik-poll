module.exports = (sequelize, DataTypes) => {
  const UserSelection = sequelize.define('UserSelection', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    pollOptionId: {
      field: 'poll_option_id',
      type: DataTypes.UUID,
      references: {
        model: 'poll_options',
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
