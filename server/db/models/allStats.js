const Sequelize = require('sequelize')
const db = require('../db')

const AllStats = db.define('allStats', {
  HP: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  Energy: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  Wisdom: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  Speed: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  Strength: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  RatioHP: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  RatioEnergy: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  RatioWisdom: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  RatioSpeed: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  RatioStrength: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  Date: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = AllStats
