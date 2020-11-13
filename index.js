const { urlParse } = require('./urlFunctions')
const { getData } = require('./requestFunctions')
const { apiResponse } = require('./responseFunctions')
const express = require('express')
const app = express()
const urlapi = require('url')
const http = require('http').createServer(app)
const PORT = 5000

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api', (req, res) => {
  const url = urlapi.parse(req.url)
  const { query, id, symbol } = urlParse(url.query)

  getData(query).then((json) => {
    try {
      res.send(apiResponse(id, json[0][4], symbol))
    } catch (err) {
      res.send(json)
    }
  })
})

http.listen(PORT, () => console.log(`Server started on port : ${PORT}`))
