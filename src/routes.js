const express = require('express');
const routes = express.Router();

const FormsController = require('./controllers/FormsController');
const StudentController = require('./controllers/StudentController');
const TeacherController = require('./controllers/TeacherController');
const CcpController = require('./controllers/CcpController');
const EvaluationController = require('./controllers/EvaluationController');
const AdminController = require('./controllers/AdminController');
const LoginController = require('./controllers/LoginController');

const auth = require('./middlewares/auth');

routes.post('/login', LoginController.login);

routes.post('/forms', auth, FormsController.store);
routes.get('/forms', auth, FormsController.index);
routes.get('/forms/:id', auth, FormsController.indexById)
routes.put('/forms', auth, FormsController.edit);
routes.delete('/forms/:id', auth, FormsController.delete);

routes.post('/student', StudentController.store);
routes.get('/student', auth, StudentController.index);
routes.get('/student/:id', auth, StudentController.indexById)
routes.put('/student', auth, StudentController.edit);
routes.delete('/student/:id', auth, StudentController.delete);

routes.post('/teacher', auth, TeacherController.store);
routes.get('/teacher', auth, TeacherController.index);
routes.get('/teacher/:id', auth, TeacherController.indexById)
routes.put('/teacher', auth, TeacherController.edit);
routes.delete('/teacher/:id', auth, TeacherController.delete);

routes.post('/ccp', auth, CcpController.store);
routes.get('/ccp', auth, CcpController.index);
routes.get('/ccp/:id', auth, CcpController.indexById)
routes.put('/ccp', auth, CcpController.edit);
routes.delete('/ccp/:id', auth, CcpController.delete);

routes.post('/evaluation', EvaluationController.store);
routes.get('/evaluation', auth, EvaluationController.index);
routes.get('/evaluation/:id', auth, EvaluationController.indexById)
routes.put('/evaluation', auth, EvaluationController.edit);
routes.delete('/evaluation/:id', auth, EvaluationController.delete);

routes.post('/admin', AdminController.store);
routes.get('/admin', auth, AdminController.index);
routes.get('/admin/:id', auth, AdminController.indexById)
routes.put('/admin', auth, AdminController.edit);
routes.delete('/admin/:id', auth, AdminController.delete);

module.exports = routes
