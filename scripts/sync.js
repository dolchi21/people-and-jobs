var sequelize = require('../sequelize')

function main(args = []) {

    var tbs = sequelize
    var model = args[2]
    if (model) {
        tbs = sequelize.model(model)
    }
    tbs.sync({ force: true }).then(() => {
        console.log(model, 'synced')
    })

}

main(process.argv)