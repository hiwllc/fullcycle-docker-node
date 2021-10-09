const express = require('express')
const mysql = require('mysql2/promise')
const faker = require('faker')

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

async function createPerson() {
  await (await connection).query(`insert into people(name) values(?)`, [faker.name.findName()])
}

app.get('/', async (request, response) => {
  await createPerson()
  const people = await fetchPeople() || []

  response.send(`
    <h1>Full Cycle Rocks!</h1>
    ${people.length > 0 ? `
      <ul>
        ${people.map(person => (
          `<li>${person.name}</li>`
        )).join('')}
      </ul>
    ` : ''}
  `)
})

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
