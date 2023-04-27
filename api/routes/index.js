const bodyParser = require('body-parser')
const tutores = require('./tutoresRoute')
const abrigos = require('./abrigosRoute')
const pets = require('./petsRoute')

module.exports = app => {
    app.use(
      bodyParser.json(),
      tutores,
      abrigos,
      pets
      )
}
