const Teacher = require('../models/Teacher');

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcrypt');


const { CCP_LEVEL, ADMIN_LEVEL, TEACHER_LEVEL } = require('../config/token');

const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, {
    expiresIn: 86400, //um dia
  });

const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

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
        } else return res.status(401).json({ msg: 'Token invalid' });
    },
    async store(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL) {
            const {name, email, password, ccp_id} = req.body;

            if (!name || !email || !password || !ccp_id)
            return res.status(400).json({ msg: 'Input is invalid' });

            const hash = generateHash(password);
            
            try {
                const result = await Teacher.create({name, email, password: hash, ccp_id});
                result.password = undefined;
                return res.status(200).json({ result, token: generateToken({ id: result.id, level: 'teacher' }), result });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token invalid' });
    },
    async edit(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL) {
            const{id, name, email, password, ccp_id} = req.body;
            try {
                const result = await Teacher.findByPk(id);
                if (!result) {
                    return res.status(404).json({ msg: 'Teacher not found' });
                  }

                const hash = generateHash(password);
                const afterUpdate = await result.update({name, email, password: hash, ccp_id});
                afterUpdate.password = undefined;
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

                return res.status(200).json({ msg: 'Teacher successfully deleted' });
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });    
    }
}