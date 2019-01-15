const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'node_shop', 
  'root', 
  '121212', 
  {dialect: 'mysql', host: 'localhost'}
);

module.exports = sequelize;