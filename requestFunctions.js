const fetch = require('node-fetch')
const burl = 'https://api.binance.com/api/v3/klines?'

const getData = (query) => fetch(burl + query).then((response) => response.json())


module.exports = {
  getData,
}
