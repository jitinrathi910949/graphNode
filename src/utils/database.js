const Sequelize = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(config.get("db.database"),
config.get("db.user"),
config.get("db.password"),
 {
    host: config.get("db.host"),
    dialect: 'postgres',
    port: config.get("db.port"),
    pool: {
      max: 9,
      min: 0,
      idle: 10000
    }
  });

  module.exports = sequelize;