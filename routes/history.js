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
        .select('People.*', 'Jobs.*', 'PersonJob.*').where('start', '<', date).where(function(){
            this.where('end', '>', date).orWhere('end', null)
        })

    sequelize.query(sql.toString()).then(rs => rs[0]).then(rs => {

        var people = rs.map(row => {
            return {
                name: [row.firstName, row.lastName].join(' '),
                job: row.name,
                start: row.start, end: row.end,
                PersonId: row.PersonId,
                JobId: row.JobId,
                id: row.id
            }
        })

        res.json({
            meta: {
                sql: sql.toString(),
                rs,
            },
            data: people
        })

    }).catch(next)
})

module.exports = router
