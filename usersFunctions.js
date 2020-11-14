const users = new Map()
const userAvailable = (id) => users.has(id)
const userGet = (key) => users.get(key)
const userSet = (key, value) => users.set(key, value)

module.exports = {
  userAvailable,
  userGet,
  userSet,
}
