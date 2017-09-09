var sequelize = require('../sequelize')

var Person = sequelize.model('Person')

function createPerson({ name = required('name'), ssn }) {
    var [firstName, lastName] = name.split(' ')
    return Person.create({
        firstName, lastName
    }).catch(err => {
        console.error('Error')
    })
}

function createPersonJob(PersonId = required('PersonId'), JobId = required('JobId'), start = required(), end = required()) {
    var PersonJob = sequelize.model('PersonJob')
    return Promise.all([PersonId, JobId, start, end]).then(([PersonId, JobId, start, end]) => {
        return PersonJob.create({
            PersonId: PersonId, JobId: JobId,
            start, end
        }).catch(err => console.error(err))
    })
}
function findPersonIdByLastName(lname) {
    return Person.findOne({
        where: { lastName: lname }
    }).then(p => p ? p.id : p)
}

Object.assign(module.exports, {
    createPerson,
    createPersonJob,
    findPersonIdByLastName
})

function required(data) {
    var err = new Error('RequiredError')
    err.data = data
    throw err
}