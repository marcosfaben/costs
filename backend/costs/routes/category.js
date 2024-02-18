var express = require('express')
var router = express.Router()
const cors = require('./cors')
const Categories = require('../models/categories')

router.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendSatus(200)})
.get(cors.corsWithOptions, (req, res, next) => {
    Categories.find({})
    .then((category) => {
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(category)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, (req, res, next) => {
    Categories.create(req.body)
    .then((category) => {
        console.log('Category Created')
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(category)
    }, (err) => next(err)).catch((err) => next(err))
})

router.route('/:id')
.options(cors.corsWithOptions, (req, res) => {res.sendSatus(200)})
.delete(cors.corsWithOptions, (req, res, next) => {
    Categories.findByIdAndDelete(req.params.id)
    .then((category) => {
        console.log('Category Deleted')
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(category)
      }, (err) => next(err))
      .catch((err) => next(err))
})

module.exports = router