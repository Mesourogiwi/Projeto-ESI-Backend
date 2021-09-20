const Teacher = require('../models/Teacher')
const Student = require('../models/Student')

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const { CCP_LEVEL, ADMIN_LEVEL, TEACHER_LEVEL } = require('../config/token');

const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, {
    expiresIn: 300, //cinco minutos
  });

module.exports = {
    async index(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL) {    
            const result = await Teacher.findAll({
                include: [{ association: 'student' }]
                });

            return res.json(result);
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async indexById(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL) {
            const {id} = req.params;

            if (!id)
            return res.status(400).json({ msg: 'Input is invalid' });

            try {
                const result = await Teacher.findByPk(id, {
                    include: [{ association: 'student' }]
                });
        
                return res.status(200).json(result);
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async store(req, res) {
        
        const {name, email, password, ccp_id} = req.body;

        if (!name || !email || !password || !ccp_id)
        return res.status(400).json({ msg: 'Input is invalid' });

        try {
            const result = await Teacher.create({name, email, password, ccp_id});

            return res.status(200).json({ result, token: generateToken({ id: result.id, level: 'teacher' }), result });
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
    },
    async edit(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL) {
            const{id, name, email, password, ccp_id} = req.body;
            try {
                const result = await Teacher.findByPk(id);

                const afterUpdate = await result.update({name, email, password, ccp_id});

                return res.status(200).json(afterUpdate);
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async delete(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL) {
            const {id} = req.params;

            if (!id)
            return res.status(400).json({ msg: 'Input is invalid' });

            try {
                const result = await Teacher.findByPk(id);

                await result.destroy(result);

                return res.status(200).json();
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });    
    }
}