const CCP = require('../models/Ccp');

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcrypt');

const { CCP_LEVEL, ADMIN_LEVEL } = require('../config/token');

const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, {
    expiresIn: 86400, //um dia
  });

const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

module.exports = {
    async index (req, res) {
        if (req.level === ADMIN_LEVEL) {    
            const result = await CCP.findAll({
                include: [
                    { association: 'teacher' }                    
                ]
            });

            return res.json(result);
        } else return res.status(401).json({ msg: 'Token Invalid' });
    
    },
    async indexById(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL) {    
            const {id} = req.params;

            if (!id || id == null || id == undefined)
            return res.status(400).json({ msg: 'CCP ID is invalid' });

            try{

            const result = await CCP.findByPk(id, {
                include: [{ association: 'teacher' }]
            });

            return res.status(200).json(result);

            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async store(req, res) {
        if (req.level === ADMIN_LEVEL) {
            const {name, email, password} = req.body;

            if (!name || !email || !password )
            return res.status(400).json({ msg: 'Input is invalid' });

            try {
                const hash = generateHash(password);
                const result = await CCP.create({name, email, password: hash});
                result.password = undefined;
                return res.status(200).json({ result, token: generateToken({ id: result.id, level: 'ccp' }), result });
            
            } catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },

    async edit(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL ) {    
            const{id, name, email, password, teacher_id} = req.body;
            try {
                
                const ccp = await CCP.findByPk(id);
                if (!ccp) {
                return res.status(404).json({ msg: 'CCP not found' });
                }
                const hash = generateHash(password);
                const afterUpdate = await ccp.update({name, email, password: hash, teacher_id});
                afterUpdate.password = undefined;
                return res.status(200).json(afterUpdate);
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });   
    },
    async delete(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL ) {  
            const {id} = req.params;

            if (!id || id == null || id == undefined)
            return res.status(400).json({ msg: 'CCP ID is invalid' });

            try {
                const ccp = await CCP.findByPk(id);
                if (!ccp) {
                    return res.status(404).json({ msg: 'CCP not found' });
                }

                await ccp.destroy(ccp);

                res.status(200).json({ msg: 'CCP successfully deleted' });
            } catch (error) {
                    return res.status(500).json({ msg: 'Validation fails' });
                }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    }
}