module.exports = (sequelize, DataTypes) => {
  const PollOption = sequelize.define(
    'PollOption',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      pollId: {
        field: 'poll_id',
        type: DataTypes.UUID,
        references: {
          model: 'polls',
          key: 'id',
        },
      },
      option: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    }, {
      paranoid: true,
      underscored: true,
      tableName: 'poll_options',
      indexes: [{
        name: 'poll_option_deleted_at_index',
        method: 'BTREE',
        fields: ['deleted_at'],
      },
      {
        name: 'poll_option_poll_id_index',
        method: 'BTREE',
        fields: ['poll_id'],
      }],
    },
  );
  PollOption.associate = ({ Poll }) => {
    PollOption.belongsTo(Poll);
  };

  return PollOption;
};
