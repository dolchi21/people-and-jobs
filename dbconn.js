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

    var PersonJobOptions = {
        tableName: 'PersonJob',
        indexes: [
            {
                unique: true,
                fields: ['PersonId', 'JobId', 'start']
            }
        ]
    }
    var PersonJob = sequelize.define('PersonJob', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        start: {
            type: Sequelize.DATE,
            allowNull: false
        },
        end: {
            type: Sequelize.DATE
        }
    }, PersonJobOptions)

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

    Person.hasMany(PersonJob)
    Job.hasMany(PersonJob)

    PersonJob.belongsTo(Job)

    return sequelize
}

module.exports = connection
