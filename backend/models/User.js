const Sequelize = require('sequelize')
const sequelize = require('./database')

const modelName = 'User'

const User = sequelize.define(modelName, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  }
})

/*User.sync().then(() => {
  console.log('New user created');
}).finally(() => {
  sequelize.close();
})*/

module.exports = User
