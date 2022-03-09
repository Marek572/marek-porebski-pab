var _this = this;
var express = require('express');
var app = express();
app.get('/', function (req, res) { res.send('Hello World'); });
//calc
// app.get('/add', function (req, res) { var _a = res.send(_this.num1 + _this.num2), num1 = _a.num1, num2 = _a.num2; });
app.listen(3001);
