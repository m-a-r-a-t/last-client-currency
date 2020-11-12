const { urlParse } = require('./urlFunctions')
const express = require('express')
const app = express()
const fetch = require('node-fetch')
const urlapi = require('url')
const http = require('http').createServer(app)
const PORT = 5000
const users = new Map()
const burl = 'https://api.binance.com/api/v3/klines?'

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
  const query = urlParse(url.query, 'query')

  fetch(burl + query)
    .then((response) => response.json())
    .then((json) => {
      users.set(urlParse(url.query, 'id'), {
        id: urlParse(url.query, 'id'),
        lastValue: json[0][4],
      })
      return json
    })
    .then((json) => res.json(json[0][4]))
  console.log(users)
})

http.listen(PORT, () => console.log(`Server started on port : ${PORT}`))

//https://api.binance.com/api/v3/klines?symbol=ETHBTC&interval=1m&limit=1

// res.writeHead(200, { 'Content-Type': 'text/json' })
// res.write('Hello World')

// res.send([{ hello: 123 }])
// res.end()
