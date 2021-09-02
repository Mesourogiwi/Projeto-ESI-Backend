const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Students = require('../models/Students')
const Teacher = require('../models/Teacher');
const Forms = require('../models/Forms');

const connection = new Sequelize(dbConfig);


Students.init(connection);
Teacher.init(connection);
Forms.init(connection);

module.exports = connection;