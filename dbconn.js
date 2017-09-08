var Sequelize = require('sequelize')

function connection() {

    var sequelize = new Sequelize('db', 'root', 'nn', {
        dialect: 'sqlite',
        storage: 'db.sqlite'
    })

    var PersonOptions = {
        indexes: [{ unique: true, fields: ['ssn'] }]
    }
    var Person = sequelize.define('Person', {
        ssn: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, PersonOptions)

    var Job = sequelize.define('Job', {
        name: {
            type: Sequelize.STRING,
            unique: true
        }
    })

    var PersonJob = sequelize.define('PersonJob', {
        start: {
            type: Sequelize.DATE,
            allowNull: false
        },
        end: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, { tableName: 'PersonJob' })
    PersonJob.belongsTo(Person)
    PersonJob.belongsTo(Job)

    var JurisdictionOptions = {
        indexes: [{ unique: true, fields: ['name', 'parentJurisdictionId'] }]
    }
    var Jurisdiction = sequelize.define('Jurisdiction', {
        name: {
            type: Sequelize.STRING
        }
    }, JurisdictionOptions)

    Job.belongsTo(Jurisdiction)
    Jurisdiction.belongsTo(Jurisdiction, { as: 'parentJurisdiction' })

    return sequelize
}

module.exports = connection
