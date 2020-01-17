const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

const db = require('knex')({
    client: "mysql2",
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'cadastro'
    }
})

const dependencies = {
    db
}

const pessoas = require('./routes/pessoas')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/pessoas', pessoas(dependencies))
//------------

app.get('/', (req, res) => {
    res.render('home')
})

//------------
db && app.listen(port, (err) => {
    console.log('Running on port: '+ port)
    if(err){ console.log('err', err) }
})

