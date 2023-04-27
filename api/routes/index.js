const bodyParser = require('body-parser')
const tutores = require('./tutoresRoute')
const abrigos = require('./abrigosRoute')


module.exports = app => {
    app.use(
      bodyParser.json(),
      tutores,
      abrigos
      )
}
