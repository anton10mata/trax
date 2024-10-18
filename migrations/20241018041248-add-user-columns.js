module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add email column if it's missing
    await queryInterface.addColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Remove email column if rolling back
    await queryInterface.removeColumn('Users', 'email');
  },
};