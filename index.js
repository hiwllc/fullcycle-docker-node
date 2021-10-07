const express = require('express')

const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.send(`<h1>Full Cycle Rocks!</h1>`)
})

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
