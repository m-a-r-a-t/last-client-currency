function urlParse(query) {
  // switch (key) {
  //   case 'id':
  //     return query.split('&')[1].split('=')[1]
  //   case 'query':
  //     return query.split('&')[0] + '&interval=1m&limit=1'
  // }
  return {
    id: query.split('&')[1].split('=')[1],
    query: query.split('&')[0] + '&interval=1m&limit=1',
  }
}

module.exports = {
  urlParse,
}
