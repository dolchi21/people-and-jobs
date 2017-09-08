var sequelize = require('../sequelize')

function createPerson({ name = required('name'), ssn }) {
    var Person = sequelize.model('Person')
    var [firstName, lastName] = name.split(' ')
    return Person.create({
        firstName, lastName
    }).catch(err => {
        console.error('Error')
    })
}

function createPersonJob(PersonId = required('PersonId'), JobId = required('JobId'), start = required(), end = required()) {
    var PersonJob = sequelize.model('PersonJob')
    return PersonJob.create({
        PersonId: PersonId, JobId: JobId,
        start, end
    }).catch(err => console.error(err))
}

Object.assign(module.exports, {
    createPerson,
    createPersonJob
})

function required(data) {
    var err = new Error('RequiredError')
    err.data = data
    throw err
}