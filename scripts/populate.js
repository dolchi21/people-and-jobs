var sequelize = require('../sequelize')

var { Jurisdiction, Job, Person, PersonJob } = sequelize.models
var { createPerson, createPersonJob, findPersonIdByLastName } = require('../services/people')

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
                Job.create({ name: 'Presidente de la Nación', JurisdictionId: arg.id }).catch(err => null),
                Job.create({ name: 'Ministro de Seguridad de la Nación', JurisdictionId: arg.id }).catch(err => null),
                Job.create({ name: 'Jefe de Gabinete de Ministerio de Seguridad de la Nación', JurisdictionId: arg.id }).catch(err => null),
                Job.create({ name: 'Diputada de la Nación por la Ciudad de Buenos Aires', JurisdictionId: arg.id }).catch(err => null),
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
                        Jurisdiction.create({
                            name: 'Capital Federal',
                            parentJurisdictionId: bsas.id
                        }).catch(err => null)
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
        }).then(() => {
            var p = findPersonIdByLastName('Bullrich')
            return Promise.all([
                createPersonJob(p, 1, '2015-12-10'),
                createPersonJob(p, 3, '2007-12-10', '2015-12-10'),
                createPersonJob(p, 3, '1993-12-10', '1997-12-10')
            ]).catch(err => console.log(err))
        })
    ])
}).catch(err => {
    console.error(err)
}).then(() => {
    return Promise.all([
        //Jurisdiction.all().then(js => console.log(js.map(j => j.get()))),
        Jurisdiction.count().then(c => console.log('Jur', c)),
        Person.count().then(c => console.log('People', c)),
        PersonJob.count().then(c => console.log('PeopleJobs', c))
    ])
})