// backend/data/database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('expensetracker', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
