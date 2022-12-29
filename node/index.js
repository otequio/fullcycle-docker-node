const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'database',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Cesar Rovai')`
connection.query(sql)
connection.end()

app.get('/', (req,res) => {
    const title = '<h1>Full Cycle</h1>'
    let names = '<p>Nomes cadastrados no banco de dados</p>'

    const connection = mysql.createConnection(config)
    connection.query('select name from people', (error, result) => {
        if (error) throw error
        names += '<ul>'
        result.forEach(el => {
            names += `<li>${el.name}</li>`
        })
        names += '</ul>'
        const response = `${title} <br><br> ${names}`
        res.send(response)
    })
    connection.end()
    
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})