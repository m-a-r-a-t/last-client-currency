const { urlParse } = require('./urlFunctions')
const { getData } = require('./requestFunctions')
const { userAvailable, userSet } = require('./usersFunctions')
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
  console.log('новый запрос')
  const url = urlapi.parse(req.url)
  const { query, id } = urlParse(url.query)

  getData(query)
    .then((json) => {
      userSet(id, { id, lastValue: json[0][4] })
      return json
    })
    .then((json) => res.end(json[0][4]))
})

http.listen(PORT, () => console.log(`Server started on port : ${PORT}`))

//https://api.binance.com/api/v3/klines?symbol=ETHBTC&interval=1m&limit=1

// res.writeHead(200, { 'Content-Type': 'text/json' })
// res.write('Hello World')

// res.send([{ hello: 123 }])
// res.end()
