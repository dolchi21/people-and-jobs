var sequelize = require('../sequelize')
sequelize.options.logging = null

var { Jurisdiction, Job, Person, PersonJob } = sequelize.models
var { createPerson, createPersonJob, findPersonIdByLastName, findPersonIdBySSN } = require('../services/people')

function createARG() {
    return Jurisdiction.findOrCreate({
        where: {
            name: 'Argentina'
        }
    }).then(([arg]) => {
        arg.parentJurisdictionId = arg.id
        return arg.save()
    })
}

Promise.all([]).then(() => {
    return Promise.all([
        createARG().then(arg => {
            return Promise.all([
                createPerson({ name: 'Mauricio Macri', ssn: '20131204699' }).catch(err => null),
                createPerson({ name: 'Patricia Bullrich', ssn: '27119883364' }).catch(err => null),
                createPerson({ name: 'Pablo Nocetti', ssn: '20181103745' }).catch(err => null),
                createPerson({ name: 'Elisa Carrió', ssn: '27135920326' }).catch(err => null),
                createPerson({ name: 'Cristina Fernández de Kirchner', ssn: '27104336154' }).catch(err => null),
                Job.create({ name: 'Presidente de la Nación', JurisdictionId: arg.id }).catch(err => null),
                Job.create({ name: 'Ministro de Seguridad de la Nación', JurisdictionId: arg.id }).catch(err => null),
                Job.create({ name: 'Jefe de Gabinete de Ministerio de Seguridad de la Nación', JurisdictionId: arg.id }).catch(err => null),
                Job.create({ name: 'Senador de la Nación por la Ciudad de Buenos Aires', JurisdictionId: arg.id }).catch(err => null),
                Job.create({ name: 'Diputado de la Nación por la Ciudad de Buenos Aires', JurisdictionId: arg.id }).catch(err => null),
                Job.create({ name: 'Senador de la Nación por la provincia de Buenos Aires', JurisdictionId: arg.id }).catch(err => null),
                Job.create({ name: 'Senador de la Nación por la provincia de Santa Cruz', JurisdictionId: arg.id }).catch(err => null),
                Job.create({ name: 'Diputado de la Nación por la provincia de Santa Cruz', JurisdictionId: arg.id }).catch(err => null),
                Jurisdiction.findOrCreate({
                    where: {
                        name: 'Buenos Aires', parentJurisdictionId: arg.id
                    }
                }).then(([bsas]) => {
                    return Promise.all([
                        Jurisdiction.create({
                            name: 'Vicente López',
                            parentJurisdictionId: bsas.id
                        }).catch(err => null),
                        Jurisdiction.create({
                            name: 'San Isidro',
                            parentJurisdictionId: bsas.id
                        }).catch(err => null),
                        Jurisdiction.findOrCreate({
                            where: {
                                name: 'Capital Federal',
                                parentJurisdictionId: bsas.id
                            }
                        }).then(([caba]) => {
                            return Promise.all([
                                Job.create({ name: 'Jefe de Gobierno de la Ciudad Autónoma de Buenos Aires', JurisdictionId: caba.id }).catch(err => null)
                            ])
                        })
                    ])
                }),
                Jurisdiction.findOrCreate({
                    where: {
                        name: 'Chubut', parentJurisdictionId: arg.id
                    }
                }).then(([chubut]) => {
                    return Promise.all([
                        Jurisdiction.create({
                            name: 'Esquel',
                            parentJurisdictionId: chubut.id
                        }).catch(err => null)
                    ])
                })
            ])
        })
    ])
}).catch(err => {
    console.error(err)
}).then(() => {
    return Promise.all([
        //Jurisdiction.all().then(js => console.log(js.map(j => j.get()))),
        Jurisdiction.count().then(c => console.log('Jur', c)),
        Person.count().then(c => console.log('People', c)),
        PersonJob.count().then(c => console.log('PeopleJobs', c)),
        Job.count().then(c => console.log('Jobs', c))
    ])
})