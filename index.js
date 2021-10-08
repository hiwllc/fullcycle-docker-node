const express = require('express')
const mysql = require('mysql2/promise')

const app = express()
const port = 3000

const config = {
  host: 'database',
  user: 'root',
  database: 'nodedb',
  password: 'root'
}

const connection = mysql.createConnection(config)

async function fetchPeople() {
  const [results] = await (await connection).query(`select * from people`)
  return results
}

app.get('/', async (request, response) => {
  const people = await fetchPeople() || []

  response.send(`
    <h1>Full Cycle Rocks!</h1>
    ${people.length > 0 ? `
      <ul>
        ${people.map(person => (
          `<li>${person.name}</li>`
        ))}
      </ul>
    ` : ''}
  `)
})

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
