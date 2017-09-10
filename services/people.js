var sequelize = require('../sequelize')
var knex = require('knex')({
    client: 'sqlite'
})

var Person = sequelize.model('Person')

function createPerson({ name = required('name'), ssn }) {
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
    return Person.findOne({
        where: { ssn },
        include: [{ all: true }]
    }).then(p => {
        return {
            ssn: p.ssn,
            name: [p.firstName, p.lastName].join(' '),
            jobs: p.PersonJobs.map(pj => pj.get())
        }
    })
}

function personJobs(personId) {
    return sequelize.model('PersonJob').all({
        where:{
            
        }
    })
}

function required(data) {
    var err = new Error('RequiredError')
    err.data = data
    throw err
}

exports.createPerson = createPerson
exports.createPersonJob = createPersonJob
exports.findPersonIdByLastName = findPersonIdByLastName
exports.findBySSN = findBySSN
