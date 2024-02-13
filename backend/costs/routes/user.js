var express = require('express');
var router = express.Router();
const cors = require('./cors')

let users= [
  {
    "name": "123",
    "cpf": "123",
    "email": "e@e.com",
    "password": "123",
    "adm": true,
    "id": 1
  },
  {
    "name": "234",
    "cpf": "234",
    "email": "e@e.com",
    "password": "2234",
    "adm": false,
    "id": 2
  },
  {
    "name": "345",
    "cpf": "345",
    "email": "345@e.com",
    "password": "345",
    "adm": false,
    "id": 3
  }
]
/* GET users listing. */
router.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.corsWithOptions, function(req, res, next) {
  //res.send('respond with a resource');k

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json(users)
})
.post(cors.corsWithOptions, (req, res) => {
  let add = req.body
  users.push(add)
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json(users)
})

router.route('/:id')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.delete(cors.corsWithOptions, function(req, res, next) {
  //res.send('respond with a resource');k

  var id = req.params.id
  users = users.filter((user) => user.id != id)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json(users)
});


module.exports = router;
