var sequelize = require('./sequelize')

const SELECT = {
    type: sequelize.Sequelize.QueryTypes.SELECT
}

var { Jurisdiction, Job, Person } = sequelize.models
var { createPerson, createPersonJob } = require('./services/people')

sequelize.sync({ force: true }).then(() => {
    return Promise.all([])
}).then(() => {

    return Promise.all([
        Jurisdiction.create({
            name: 'Argentina'
        }).then(arg => {
            return Promise.all([
                createPerson({ name: 'Mauricio Macri', ssn: '20131204699' }),
                createPerson({ name: 'Patricia Bullrich', ssn: '27119883364' }),
                createPerson({ name: 'Pablo Nocetti', ssn: '20181103745' }),
                Job.create({ name: 'Presidente de la Nación', JurisdictionId: arg.id }),
                Job.create({ name: 'Ministro de Seguridad de la Nación', JurisdictionId: arg.id }),
                Job.create({ name: 'Jefe de Gabinete de Ministerio de Seguridad de la Nación', JurisdictionId: arg.id }),
                Jurisdiction.create({
                    name: 'Buenos Aires', parentJurisdictionId: arg.id
                }).then(bsas => {
                    return Promise.all([
                        Jurisdiction.create({
                            name: 'Vicente López',
                            parentJurisdictionId: bsas.id
                        }),
                        Jurisdiction.create({
                            name: 'San Isidro',
                            parentJurisdictionId: bsas.id
                        }),
                        Jurisdiction.create({
                            name: 'Capital Federal',
                            parentJurisdictionId: bsas.id
                        })
                    ])
                }),
                Jurisdiction.create({
                    name: 'Chubut', parentJurisdictionId: arg.id
                }).then(chubut => {
                    return Promise.all([
                        Jurisdiction.create({
                            name: 'Esquel',
                            parentJurisdictionId: chubut.id
                        })
                    ])
                })
            ])
        }).then(() => {
            return Promise.all([
                createPersonJob(1, 1, '2017-01-01', new Date())
            ])
        })
    ])

}).then(() => {


    sequelize.query('select * from sqlite_master', SELECT).then(rs => console.log(rs))

    //sequelize.query('select * from People', SELECT).then(rs => console.log(rs))
    //sequelize.query('select * from Jobs', SELECT).then(rs => console.log(rs))
    sequelize.query('select * from PersonJob', SELECT).then(rs => console.log(rs))
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
