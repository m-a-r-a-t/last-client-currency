const app = require('express')()
const http = require('http').createServer(app)
const PORT = 5000






http.listen(PORT, () => console.log(`Server started on port : ${PORT}`))
