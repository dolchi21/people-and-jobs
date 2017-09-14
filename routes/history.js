var express = require('express')
var router = express.Router()

var sequelize = require('../sequelize')
var knex = require('knex')({
    client: 'sqlite'
})

var { People, Jobs } = require('../services')

router.get('/byDate/:date', (req, res, next) => {

    var date = req.params.date

    var sql = knex('PersonJob')
        .join('People', 'PersonJob.PersonId', 'People.id')
        .join('Jobs', 'PersonJob.JobId', 'Jobs.id')
        .select().where('start', '<', date).where('end', '>', date)

    sequelize.query(sql.toString()).then(rs => rs[0]).then(rs => {

        var people = rs.map(row => {
            return {
                name: [row.firstName, row.lastName].join(' '),
                job: row.name
            }
        })

        res.json({
            sql: sql.toString(),
            people,
            rs,
        })

    }).catch(next)
})

module.exports = router
