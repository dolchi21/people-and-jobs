var sequelize = require('../sequelize')

var { Job, Jurisdiction } = sequelize.models

var createJob = exports.createJob = function createJob({ name, JurisdictionId }) {
    return Job.create({
        name
    }).catch(err => {
        console.error('Error')
    })
}

var all = exports.all = function all() {
    return Job.all({
        include: [{ model: Jurisdiction }]
    }).then(jobs => {
        return jobs.map(({ id, name, JurisdictionId, Jurisdiction }) => {
            return {
                id, name, JurisdictionId,
                jurisdiction: Jurisdiction.name
            }
        })
    })
}