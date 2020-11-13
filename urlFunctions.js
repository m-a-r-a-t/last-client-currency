function urlParse(query) {
  const symbolWithValue = query.split('&')[0]
  return {
    id: query.split('&')[1].split('=')[1],
    query: symbolWithValue + '&interval=1m&limit=1',
    symbol: symbolWithValue.split('=')[1],
  }
}

module.exports = {
  urlParse,
}
