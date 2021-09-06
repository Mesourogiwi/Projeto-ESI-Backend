const express = require('express');
const routes = express.Router();

const FormsController = require('./controllers/FormsController');
const StudentController = require('./controllers/StudentsController');
const TeacherController = require('./controllers/TeacherController');

routes.post('/forms', FormsController.store);
routes.get('/forms', FormsController.index);
routes.get('/forms/:id', FormsController.indexById)
routes.put('/forms', FormsController.edit);
routes.delete('/forms/:id', FormsController.delete);

routes.post('/student', StudentController.store);
routes.get('/student', StudentController.index);
routes.get('/student/:id', StudentController.indexById)
routes.put('/student', StudentController.edit);
routes.delete('/student/:id', StudentController.delete);

routes.post('/teacher', TeacherController.store);
routes.get('/teacher', TeacherController.index);
routes.get('/teacher/:id', TeacherController.indexById)
routes.put('/teacher', TeacherController.edit);
routes.delete('/teacher/:id', TeacherController.delete);

module.exports = routes
