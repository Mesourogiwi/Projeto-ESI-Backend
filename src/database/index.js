const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Students = require('../models/Students')
const Teacher = require('../models/Teacher');
const Forms = require('../models/Forms');
const Avaliations = require('../models/Avaliations');
const Ccp = require('../models/Ccp');

const connection = new Sequelize(dbConfig);

connection.authenticate().then(() => {
  console.log('conectado')  
}).catch((err) => {
    console.log(err)
})


Students.init(connection);
Teacher.init(connection);
Forms.init(connection);
Avaliations.init(connection);
Ccp.init(connection);

module.exports = connection;