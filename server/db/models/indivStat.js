const Sequelize = require('sequelize')
const db = require('../db')

const IndivStat = db.define('indivStat', {
  Name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = IndivStat
