module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('polls', {
        id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false,
        },
        prompt: {
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
        deleted_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
      });
      await queryInterface.addIndex('polls', {
        name: 'poll_deleted_at_index',
        method: 'BTREE',
        fields: ['deleted_at'],
      });
      await queryInterface.addIndex('polls', {
        name: 'poll_user_id_index',
        method: 'BTREE',
        fields: ['user_id'],
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
  down: queryInterface => queryInterface.dropTable('Polls'),
};
