const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use((_, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  next()
})

// "In memory" data store
let dataStore = require('./orders.js')

server.get('/orders', (_, res) => {
  res.json({
    items: dataStore,
  })
})

server.get('/orders/:id', (req, res) => {
  res.json({
    id: parseInt(req.params.id),
  })
})

module.exports = {
  server,
  dataStore,
}