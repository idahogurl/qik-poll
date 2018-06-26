// File is auto-generated. Do not modify!!

/* eslint-disable */
'use strict'

var fs        = require('fs')
var path      = require('path')
var Sequelize = require('sequelize')
var basename  = path.basename(__filename)
var env       = process.env.NODE_ENV || 'development'
var db        = {}

if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    })
  } else {
    const config = {
      "username": "username",
      "password": "password",
      "database": "database",
      "storage": "./dev.sqlite3",
      "dialect": "sqlite"
    }
    // the application is executed on the local machine ... use sqlite
    var sequelize = new Sequelize(config.database, config.username, config.password, config)
  }

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
        var model = sequelize['import'](path.join(__dirname, file))
        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
