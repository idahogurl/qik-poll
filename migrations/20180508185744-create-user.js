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
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        password_reset_token: {
          type: Sequelize.DataTypes.STRING,
        },
        password_reset_expires: {
          type: Sequelize.DataTypes.DATE,
        },
        gender: Sequelize.DataTypes.STRING,
        location: Sequelize.DataTypes.STRING,
        website: Sequelize.DataTypes.STRING,
        picture: Sequelize.DataTypes.STRING,
        facebook: Sequelize.DataTypes.STRING,
        twitter: Sequelize.DataTypes.STRING,
        google: Sequelize.DataTypes.STRING,
        vk: Sequelize.DataTypes.STRING,
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
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
