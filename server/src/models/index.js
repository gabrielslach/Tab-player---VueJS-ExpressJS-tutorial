const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs
  .readdirSync(__dirname) // reads all the files on the directory
  .filter((file) => // get the files that is not index.js
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model // store the 'sequelized' files path on the db object
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
