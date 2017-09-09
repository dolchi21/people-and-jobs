var sequelize = require('../sequelize')

var { Jurisdiction, Job, Person } = sequelize.models
var { createPerson, createPersonJob, findPersonIdByLastName } = require('../services/people')

Promise.all([]).then(() => {
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
            var p = findPersonIdByLastName('Bullrich')
            return Promise.all([
                createPersonJob(p, 1, '2015-12-10')
            ])
        })
    ])
}).catch(err => {
    console.error(err)
})