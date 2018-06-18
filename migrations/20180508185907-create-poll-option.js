module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('poll_options', {
        id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        poll_id: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'polls',
            key: 'id',
          },
          allowNull: false,
        },
        option: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
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
      });

      await queryInterface.addIndex('poll_options', {
        name: 'poll_option_deleted_at_index',
        method: 'BTREE',
        fields: ['deleted_at'],
      });
      await queryInterface.addIndex('poll_options', {
        name: 'poll_option_poll_id_index',
        method: 'BTREE',
        fields: ['poll_id'],
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
  down: queryInterface => queryInterface.dropTable('PollOptions'),
};
