var express = require('express')
var router = express.Router()

var People = require('../services/people')
var Jobs = require('../services/jobs')

router.get('/people', (req, res, next) => {
    People.all().then(people => {
        res.json({ data: people })
    }).catch(next)
})
router.get('/people/:ssn', (req, res, next) => {
    People.findBySSN(req.params.ssn).then(person => {
        res.json({
            data: person
        })
    }).catch(next)
})
router.get('/people/:ssn/jobs', (req, res, next) => {
    return People.getJobsBySSN(req.params.ssn).then(jobs => {
        res.json(jobs)
    }).catch(next)
})

router.get('/jobs', (req, res, next) => {
    Jobs.all().then(jobs => {
        res.json(jobs)
    })
})

module.exports = router