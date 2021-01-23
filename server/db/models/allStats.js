const Sequelize = require('sequelize')
const db = require('../db')

const AllStats = db.define('allStats', {
  HP: {
    type: Sequelize.INTEGER,
    allowNull: false,
    DefaultValue: 0
  },
  Energy: {
    type: Sequelize.INTEGER,
    allowNull: false,
    DefaultValue: 0
  },
  Wisdom: {
    type: Sequelize.INTEGER,
    allowNull: false,
    DefaultValue: 0
  },
  Speed: {
    type: Sequelize.INTEGER,
    allowNull: false,
    DefaultValue: 0
  },
  Strength: {
    type: Sequelize.INTEGER,
    allowNull: false,
    DefaultValue: 0
  },
  Date: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = AllStats
