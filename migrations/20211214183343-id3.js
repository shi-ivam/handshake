'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */return Promise.all([
      queryInterface.changeColumn('Invoices', 'id', {
        type: Sequelize.STRING,
        allowNull: false,
    })
])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Invoices', 'id', {
          type: Sequelize.INTEGER,
      })
  ])
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
