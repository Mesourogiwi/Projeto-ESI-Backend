const Student = require('../models/Student')

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcrypt');

const { CCP_LEVEL, ADMIN_LEVEL, TEACHER_LEVEL, STUDENT_LEVEL } = require('../config/token');

const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, {
    expiresIn: 86400, //um dia
  });

module.exports = {
    async index(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL) {
            const result = await Student.findAll({
                include: [{ association: 'forms' }]
                });

            return res.json(result);
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async indexById(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL || req.level === STUDENT_LEVEL) {
            const {id} = req.params;

            if (!id)
            return res.status(400).json({ msg: 'Input is invalid' });

            try {
                const result = await Student.findByPk(id, {
                    include: [{ association: 'forms' }]
                    });
        
                return res.status(200).json(result);
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async store(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL) {    
            const {name, email, password, usp_number, lattes, teacher_id} = req.body;
            
            if (!name || !email || !password || !usp_number || !lattes || !teacher_id)
            return res.status(400).json({ msg: 'Input is invalid' });

            try {
                const hash = generateHash(password);
                const result = await Student.create({name, email, password: hash, usp_number, lattes, teacher_id});
                result.password = undefined;
                return res.status(200).json({ result, token: generateToken({ id: result.id, level: 'student' }), result });
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async edit(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL || req.level === STUDENT_LEVEL) {
            const{id, name, email, password, usp_number, lattes, teacher_id} = req.body;        
            
            try {
            const result = await Student.findByPk(id);
            const hash = generateHash(password);
            const afterUpdate = await result.update({name, email, password: hash, usp_number, lattes, teacher_id});
            afterUpdate.password = undefined;
            return res.status(200).json(afterUpdate);
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async delete(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL || req.level === STUDENT_LEVEL) {
            const {id} = req.params;

            if (!id)
            return res.status(400).json({ msg: 'Input is invalid' });

            try {
                const result = await Student.findByPk(id);

                await result.destroy(result);
        
                return res.status(200).json({ msg: 'Student successfully deleted' });
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    }
}