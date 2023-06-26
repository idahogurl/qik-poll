module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable(
    'poll_option',
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      poll_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'poll',
          key: 'id',
        },
        allowNull: false,
      },
      option: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      votes: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      deleted_at: Sequelize.DataTypes.DATE,
    },
    {
      indexes: [
        {
          name: 'poll_option_deleted_at_index',
          method: 'BTREE',
          fields: ['deleted_at'],
        },
        {
          name: 'poll_option_poll_id_index',
          method: 'BTREE',
          fields: ['poll_id'],
        },
      ],
    },
  ),
  down: (queryInterface) => queryInterface.dropTable('poll_option'),
};
