const express = require('express')
const middleware = require('./middleware/server/mw.server')
const routes = require('./routes/index.routes.js')

const server = express()
middleware(server)
routes(server)

server.get('/', (req, res) => {
  res.send(`<h1>It's ALIIIIVE</h1>`)})

server.use('*', (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = server
