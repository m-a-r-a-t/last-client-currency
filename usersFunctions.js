const users = new Map()

const userAvailable = (id) => {}
const userSet = (key, value) =>{users.set(key, value)
console.log(users)
}

module.exports = {
  userAvailable,
  userSet,
}
