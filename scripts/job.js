var sequelize = require('../sequelize')

var { PersonJob, Job } = sequelize.models

var query = process.argv[2]

var is2o = is => is.map(i2o)
var i2o = i => i.get()

Job.all().then(is2o).then(jobs => {
    console.log(jobs)
})

PersonJob.all().then(is2o).then(jobs => {
    console.log(jobs)
})
