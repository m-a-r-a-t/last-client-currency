const { userSet, userGet } = require('./usersFunctions')

const changePercent = (currentValue, lastValue) => {
  return (currentValue * 100) / lastValue - 100
}

const symbolCreator = (lastValue, currentValue, change) => ({
  lastValue,
  currentValue,
  change,
})

const apiResponse = (id, value, symbol) => {
  switch (!userGet(id)) {
    case true:
      const map = new Map()
      map.set(symbol, symbolCreator(0, value, value))
      userSet(id, { id, crypto: map })
      return userGet(id).crypto.get(symbol)

    case false:
      if (!userGet(id).crypto.get(symbol)) {
        userGet(id).crypto.set(symbol, symbolCreator(0, value, value))
        return userGet(id).crypto.get(symbol)
      }

      const { currentValue } = userGet(id).crypto.get(symbol)
      userGet(id).crypto.set(
        symbol,
        symbolCreator(currentValue, value, changePercent(value, currentValue))
      )
      return userGet(id).crypto.get(symbol)
  }
}

module.exports = {
  apiResponse,
}
