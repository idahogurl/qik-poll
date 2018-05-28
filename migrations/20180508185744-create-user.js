module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        first_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          validate: {
            isEmail: true,
          },
          unique: true,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deleted_at: Sequelize.DATE,
      }, {
        transaction,
      });
      await queryInterface.addIndex('users', {
        name: 'user_deleted_at_index',
        method: 'BTREE',
        fields: ['deleted_at'],
        transaction,
      });
      await queryInterface.addIndex('users', {
        name: 'user_email_index',
        method: 'BTREE',
        fields: ['email'],
        transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
  down: queryInterface => queryInterface.dropTable('Users'),
};
