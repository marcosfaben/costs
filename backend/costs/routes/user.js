var express = require('express');
var router = express.Router();
const cors = require('./cors')
const Users = require('../models/users')

/* GET users listing. */
router.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.corsWithOptions, function(req, res, next) {
  Users.find({})
  .then((usersBanc) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'appication/json')
    res.json(usersBanc)
  }, (err) => next(err))
  .catch((err) => next(err))
})
.post(cors.corsWithOptions, (req, res, next) => {

  Users.create(req.body)
  .then((user) => {
    console.log('User Created', user)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(user)
  }, (err) => next(err))
  .catch((err) => next(err))
})

router.route('/:id')
.options(cors.corsWithOptions, (req, res, next) => {res.sendStatus(200)})
.delete(cors.corsWithOptions, function(req, res, next) {
  
  Users.findByIdAndDelete(req.params.id)
  .then((user) => {
    console.log('User Deleted')
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(user)
  }, (err) => next(err))
  .catch((err) => next(err))
});


module.exports = router;
