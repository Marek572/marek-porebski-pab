const express = require('express')
const app = express()
app.get('/', function (req, res) { res.send('Hello World') })

//calc
// app.get('/add', (req, res) => { const {num1 ,num2} = res.send(this.num1 + this.num2)})


app.listen(3001)