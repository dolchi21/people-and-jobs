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
function findBySSN(ssn = required('SSN')) {
    debug('Getting %s', ssn)
    return Person.findOne({
        where: { ssn }
    }).then(p => {
        return {
            ssn: p.ssn,
            name: [p.firstName, p.lastName].join(' ')
        }
    })
}
function findPersonIdBySSN(ssn = required('SSN')) {
    debug('Getting id %s', ssn)
    return Person.findOne({
        where: { ssn }
    }).then(p => p ? p.id : p)
}
function all() {
    return Person.all().then(people => {
        return people.map(({ id, ssn, firstName, lastName }) => {
            return {
                id, ssn, name: [firstName, lastName].join(' ')
            }
        })
    })
}

function getJobsBySSN(ssn) {
    return findPersonIdBySSN(ssn).then(id => {
        return sequelize.models.PersonJob.all({
            where: {
                PersonId: id
            },
            include: [{ model: sequelize.models.Job }]
        })
    }).then(jobs => {
        return jobs.map(job => {
            return {
                id: job.id,
                name: job.Job.name,
                start: job.start,
                end: job.end,
                JobId: job.JobId,
                JurisdictionId: job.Job.JurisdictionId
            }
        })
    })
}

function required(data) {
    var err = new Error('RequiredError')
    err.data = data
    throw err
}

exports.getJobsBySSN = getJobsBySSN
exports.createPerson = createPerson
exports.createPersonJob = createPersonJob
exports.findPersonIdByLastName = findPersonIdByLastName
exports.findBySSN = findBySSN
exports.findPersonIdBySSN = findPersonIdBySSN
exports.all = all
