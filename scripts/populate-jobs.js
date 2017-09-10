var sequelize = require('../sequelize')

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
    var bullrich = findPersonIdByLastName('Bullrich')
    var macri = findPersonIdBySSN('20131204699')
    var cristina = findPersonIdBySSN('27104336154')
    var presidente = findJobId('Presidente Nación')
    var jefeCABA = findJobId('Jefe Gobierno Ciudad')
    var diputado = {
        caba: findJobId('Diputado Nación Ciudad Buenos'),
        stacruz: findJobId('Diputado Nación Santa Cruz')
    }
    var senador = {
        caba: findJobId('Senador Nación la Ciudad Buenos'),
        bsas: findJobId('Senador Nación prov Buenos Aires'),
        stacruz: findJobId('Senador Nación prov Santa Cruz')
    }
    var min = {
        seg: findJobId('Ministro Seguridad Nación')
    }
    return Promise.all([
        createPersonJob(bullrich, min.seg, '2015-12-10').catch(err => null),
        createPersonJob(bullrich, diputado.caba, '2007-12-10', '2015-12-10').catch(err => null),
        createPersonJob(bullrich, diputado.caba, '1993-12-10', '1997-12-10').catch(err => null),
        createPersonJob(macri, jefeCABA, '2007-12-10', '2015-12-09').catch(err => null),
        createPersonJob(macri, presidente, '2015-12-10').catch(err => null),
        createPersonJob(cristina, senador.stacruz, '1995-12-10', '1997-12-03').catch(err => null),
        createPersonJob(cristina, diputado.stacruz, '1997-12-10', '2001-12-09').catch(err => null),
        createPersonJob(cristina, senador.stacruz, '2001-12-10', '2005-12-10').catch(err => null),
        createPersonJob(cristina, senador.bsas, '2005-12-10', '2007-11-28').catch(err => null),
        createPersonJob(cristina, presidente, '2007-12-10', '2015-12-09').catch(err => null)
    ]).catch(err => console.log(err))
})

function findJob(name) {
    var words = name.split(' ').join('%')
    return Job.findOne({
        where: {
            name: { $like: '%' + words + '%' }
        }
    })
}
function findJobId(name) {
    return findJob(name).then(job => job.id)
}
