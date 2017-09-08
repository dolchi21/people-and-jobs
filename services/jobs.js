var sequelize = require('../sequelize')

function createJob({ name, JurisdictionId }) {
    var Job = sequelize.model('Job')
    return Job.create({
        name
    }).catch(err => {
        console.error('Error')
    })
}

Object.assign(module.exports, {
    createJob
})
