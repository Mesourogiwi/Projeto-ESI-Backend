const express = require('express');
const routes = express.Router();

const FormsController = require('./controllers/FormsController');
const StudentController = require('./controllers/StudentController');
const TeacherController = require('./controllers/TeacherController');
const CcpController = require('./controllers/CcpController');
const EvaluationController = require('./controllers/EvaluationController');
const AdminController = require('./controllers/AdminController');

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

routes.post('/ccp', CcpController.store);
routes.get('/ccp', CcpController.index);
routes.get('/ccp/:id', CcpController.indexById)
routes.put('/ccp', CcpController.edit);
routes.delete('/ccp/:id', CcpController.delete);

routes.post('/evaluation', EvaluationController.store);
routes.get('/evaluations', EvaluationController.index);
routes.get('/evaluations/:id', EvaluationController.indexById)
routes.put('/evaluations', EvaluationController.edit);
routes.delete('/evaluations/:id', EvaluationController.delete);

routes.post('/admin', AdminController.store);
routes.get('/admins', AdminController.index);
routes.get('/admin/:id', AdminController.indexById)
routes.put('/admin', AdminController.edit);
routes.delete('/admin/:id', AdminController.delete);

module.exports = routes
