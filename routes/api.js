var express = require('express')
var router = express.Router()

var { People, Jobs } = require('../services')

router.use('/history', require('./history'))

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
        res.json({
            data: jobs
        })
    }).catch(next)
})

router.get('/jobs', (req, res, next) => {
    Jobs.all().then(jobs => {
        res.json({ data: jobs })
    }).catch(next)
})

module.exports = router
