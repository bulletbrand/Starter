const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'starter',
  'user',
  'root',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = sequelize;