var express = require('express');
var app = express();
app.get('/', function (req, res) { res.send('Hello World'); });
//calc
//app.get('/calculator', function (req, res) { var _a = req.query, operation = _a.operation, num1 = _a.num1, num2 = _a.num2; });
app.listen(3001);
