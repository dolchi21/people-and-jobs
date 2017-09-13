var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/api', require('./routes/api'))

module.exports = app
