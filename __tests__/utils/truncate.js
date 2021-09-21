const Sequelize = require('sequelize')
const dbConfig = require('../../src/config/database')
const sequelize = new Sequelize(dbConfig)

module.exports = () => {
    return Promise.all(
        Object.keys(sequelize.models).map(key => {
            return sequelize.models[key].destroy({ truncate: true, force:true })
        })
    )
}