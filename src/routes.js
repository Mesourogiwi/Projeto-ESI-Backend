const express = require('express');
const routes = express.Router();

const FormsController = require('./controllers/FormsController');
const StudentController = require('./controllers/StudentsController');
const TeacherController = require('./controllers/TeacherController');

routes.post('/forms', FormsController.store);
routes.get('/forms', FormsController.index);
routes.get('/forms/:id', FormsController.indexById)
routes.put('/forms', FormsController.edit);
routes.delete('/forms', FormsController.delete);

routes.post('/student', StudentController.store);
routes.get('/student', StudentController.index);
routes.get('/forms/:id', StudentController.indexById)
routes.put('/student', StudentController.edit);
routes.delete('/student', StudentController.delete);

routes.post('/teacher', TeacherController.store);
routes.get('/teacher', TeacherController.index);
routes.get('/forms/:id', TeacherController.indexById)
routes.put('/teacher', TeacherController.edit);
routes.delete('/teacher', TeacherController.delete);

module.exports = routes
