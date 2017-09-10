var sequelize = require('../sequelize')

var People = require('../services/people')

var query = process.argv[2]

People.findBySSN(query).then(p => {
    console.log(p)
})