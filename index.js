function main() {

    var sequelize = require('./sequelize')

    const SELECT = {
        type: sequelize.Sequelize.QueryTypes.SELECT
    }

    var { Jurisdiction, Job, Person } = sequelize.models
    var { createPerson, createPersonJob } = require('./services/people')

    Promise.all([]).then(() => {

        sequelize.query('select * from sqlite_master', SELECT).then(rs => console.log(rs))

        sequelize.query('select * from People', SELECT).then(rs => console.log(rs))
        //sequelize.query('select * from Jobs', SELECT).then(rs => console.log(rs))
        //sequelize.query('select * from PersonJob', SELECT).then(rs => console.log(rs))
        //sequelize.query('select * from Jurisdictions', SELECT).then(rs => console.log(rs))

        return;
        Jurisdiction.all({
            include: [{
                model: Jurisdiction,
                as: 'parentJurisdiction',
                where: {
                    name: 'Buenos Aires'
                }
            }]
        }).then(is2o).then(js => console.log(js))

    })

    var is2o = is => is.map(i2o)
    var i2o = i => i.get()
}

//require('./scripts/populate')
//require('./store')
require('./app').listen(3000)
//main()
