module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable(
    'poll',
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      question: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: Sequelize.DataTypes.DATE,
    },
    {
      indexes: [
        {
          name: 'poll_deleted_at_index',
          method: 'BTREE',
          fields: ['deleted_at'],
        },
        {
          name: 'poll_user_id_index',
          method: 'BTREE',
          fields: ['user_id'],
        },
      ],
    },
  ),
  down: (queryInterface) => queryInterface.dropTable('poll'),
};
