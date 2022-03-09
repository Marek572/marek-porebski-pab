const express = require('express')
const app = express()
app.get('/', function (req, res) { res.send('Hello World') })

//calc
//app.get('/calculator', (req, res) => { const {operation, num1 ,num2} = req.query })


app.listen(3001)