var sequelize = require('../sequelize')

var { Job, Jurisdiction } = sequelize.models

function createJob({ name, JurisdictionId }) {
    return Job.create({ name }).catch(err => {
        console.error('Error')
    })
}

async function all() {
    var jobs = await Job.all({
        include: [{ model: Jurisdiction }]
    })
    return jobs.map(({ id, name, JurisdictionId, Jurisdiction }) => ({
        id,
        name,
        JurisdictionId,
        jurisdiction: Jurisdiction.name
    }))
}

module.exports = {
    all,
    createJob
}
