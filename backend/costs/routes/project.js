var express = require('express')
var router = express.Router()
const cors = require('./cors')
const Projects = require('../models/projects')

/* GET users listing. */
router.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.corsWithOptions, function(req, res, next) {
  Projects.find({})
  .then((project) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'appication/json')
    res.json(project)
  }, (err) => next(err))
  .catch((err) => next(err))
})
.post(cors.corsWithOptions, (req, res, next) => {

  Projects.create(req.body)
  .then((project) => {
    console.log('Project Created', project)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(project)
  }, (err) => next(err))
  .catch((err) => next(err))
})

router.route('/:id')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.delete(cors.corsWithOptions, (req, res, next) => {
  Projects.findByIdAndDelete(req.params.id)
  .then((project) => {
    console.log('Project Deleted')
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(project)
  }, (err) => next(err))
  .catch((err) => next(err))
})
.get(cors.corsWithOptions, (req, res, next) => {
  Projects.findById(req.params.id)
  .then((project) => {
    console.log('Get Project')
    console.log(project)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(project)
  })
})
.put(cors.corsWithOptions, (req, res, next) => {
  Projects.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
    .then((project) => {
      console.log(project)
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(project)
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = router;