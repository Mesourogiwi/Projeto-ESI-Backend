const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Student = require('../models/Student')
const Teacher = require('../models/Teacher');
const Forms = require('../models/Forms');
const Evaluation = require('../models/Evaluation');
const Ccp = require('../models/Ccp');

const connection = new Sequelize(dbConfig);

connection.authenticate().then(() => {
  console.log('conectado')  
}).catch((err) => {
    console.log(err)
})


Student.init(connection);
Teacher.init(connection);
Forms.init(connection);
Evaluation.init(connection);
Ccp.init(connection);

Teacher.associate(connection.models);
Evaluation.associate(connection.models);
Student.associate(connection.models);
Ccp.associate(connection.models);
Forms.init(connection);

module.exports = connection;