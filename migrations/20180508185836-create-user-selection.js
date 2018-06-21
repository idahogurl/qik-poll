module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('user_selections', {
        id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        pollOptionId: {
          type: Sequelize.DataTypes.UUID,
          field: 'poll_option_id',
          references: {
            model: 'poll_options',
            key: 'id',
          },
        },
      });
      await queryInterface.addIndex('user_selections', {
        name: 'user_selection_poll_option_id_index',
        method: 'BTREE',
        fields: ['poll_option_id'],
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
  down: queryInterface => queryInterface.dropTable('UserSelections'),
};
