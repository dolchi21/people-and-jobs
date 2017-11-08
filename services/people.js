var debug = require('debug')('service:people')
var sequelize = require('../sequelize')
var knex = require('knex')({
    client: 'sqlite'
})

var Person = sequelize.model('Person')

function createPerson({ name = required('name'), ssn }) {
    debug('Creating person %s (%s)', name, ssn)
    var [firstName, lastName] = name.split(' ')
    return Person.create({
        ssn, firstName, lastName
    })
}

function createPersonJob(PersonId = required('PersonId'), JobId = required('JobId'), start = required(), end) {
    var PersonJob = sequelize.model('PersonJob')
    return Promise.all([PersonId, JobId, start, end]).then(([PersonId, JobId, start, end]) => {
        return PersonJob.create({
            PersonId: PersonId, JobId: JobId,
            start, end
        })
    })
}
function findPersonIdByLastName(lname) {
    return Person.findOne({
        where: { lastName: lname }
    }).then(p => p ? p.id : p)
}
async function findById(id = required('PersonId')) {
    var p = await Person.findById(id)
    return {
        id: p.id,
        ssn: p.ssn,
        name: [p.firstName, p.lastName].join(' ')
    }
}
async function findBySSN(ssn = required('SSN')) {
    debug('Getting %s', ssn)
    var p = await Person.findOne({
        where: { ssn }
    })
    return {
        id: p.id,
        ssn: p.ssn,
        name: [p.firstName, p.lastName].join(' ')
    }
}
function findPersonIdBySSN(ssn = required('SSN')) {
    debug('Getting id %s', ssn)
    return Person.findOne({
        where: { ssn }
    }).then(p => p ? p.id : p)
}
async function all() {
    var people = await Person.all()
    return people.map(({ id, ssn, firstName, lastName }) => {
        return {
            id, ssn, name: [firstName, lastName].join(' ')
        }
    })
}

async function getJobsBySSN(ssn) {
    var id = await findPersonIdBySSN(ssn)
    var jobs = await sequelize.model('PersonJob').all({
        where: {
            PersonId: id
        },
        include: [{ model: sequelize.models.Job }]
    })
    return jobs.map(job => {
        return {
            id: job.id,
            name: job.Job.name,
            start: job.start,
            end: job.end,
            PersonId: job.PersonId,
            JobId: job.JobId,
            JurisdictionId: job.Job.JurisdictionId
        }
    })
}

function required(data) {
    var err = new Error('RequiredError')
    err.data = data
    throw err
}

module.exports = {
    all,
    createPerson,
    createPersonJob,
    findById,
    findBySSN,
    findPersonIdByLastName,
    findPersonIdBySSN,
    getJobsBySSN
}
