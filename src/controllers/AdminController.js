const Admin = require('../models/Admin');

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcrypt');

const { ADMIN_LEVEL } = require('../config/token');

const generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, {
    expiresIn: 86400, //um dia
  });

module.exports = {
    async index (req, res) {
        const result = await Admin.findAll();

        return res.json(result);
    },
    async indexById(req, res) {
        const {id} = req.params;

        if (!id)
        return res.status(400).json({ msg: 'Admin ID is invalid' });

        try{
          const result = await Admin.findByPk(id);
          return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
    },
    async store(req, res) {
      const {name, email, password} = req.body;

      if (!name || !email || !password )
      return res.status(400).json({ msg: 'Input is invalid' });

      try {
        const hash = generateHash(password);

        const result = await Admin.create({name, email, password: hash});
        result.password = undefined;
        return res.status(200).json({ result, token: generateToken({ id: result.id, level: 'admin' }), result });
    
      } catch (error) {
          console.log(error)
          return res.status(500).json({ msg: 'Validation fails' });
      }
    },

    async edit(req, res) {
      if (req.level === ADMIN_LEVEL) {
        const{id, name, email, password, teacher_id} = req.body;
        try {
          const result = await Admin.findByPk(id);
          if (!result) {
            return res.status(404).json({ msg: 'Admin not found' });
          }
          const hash = generateHash(password);

          const afterUpdate = await result.update({name, email, password: hash, teacher_id});
          afterUpdate.password = undefined;
          return res.status(200).json(afterUpdate);

        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
      } else return res.status(401).json({ msg: 'Token Invalid' });  
    },
    async delete(req, res) {
      if (req.level === ADMIN_LEVEL) {  
        const {id} = req.params;

          if (!id)
          return res.status(400).json({ msg: 'Admin ID is invalid' });

          try {
            const result = await Admin.findByPk(id);
            if (!result) {
              return res.status(404).json({ msg: 'Admin not found' });
            }

            await result.destroy(result);
              return res.status(200).json({ msg: 'Admin successfully deleted' });

          } catch (error) {
              return res.status(500).json({ msg: 'Validation fails' });
            }
      } else return res.status(401).json({ msg: 'Token Invalid' });
    }
}