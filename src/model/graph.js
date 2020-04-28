const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Graph = sequelize.define('graph', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: true
    },
    price: {
        type: Sequelize.FLOAT,
         allowNull: false
    },
    turnover: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    drawdown: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});
Graph.sync({ alter: true })
module.exports = Graph;
