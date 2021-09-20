const Admin = require('../models/Admin');
const Ccp = require('../models/Ccp');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const validPassword = (password, hash) => bcrypt.compareSync(password, hash);

const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, {
  expiresIn: 86400, //um dia
});

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || email == null || email == undefined)
      return res.status(400).json({ msg: 'Email is invalid' });

    if (!password || password == null || password == undefined)
      return res.status(400).json({ msg: 'Password is invalid' });

    try {
      let admin = await Admin.findOne({ where: { email: email } });
      if (admin) {
        admin = admin.dataValues;

        let ok = validPassword(password, admin.password);

        if (!ok)
          return res.status(500).json({ msg: 'Validation fails Admin' });

        else {

          let admin = await Admin.findOne();
          admin = admin.dataValues;
          let ok = validPassword(password, admin.password);

          if (!ok) {
            return res.status(401).json({ msg: 'Password Incorrect' });
          }
          admin.password = undefined;
          
          return res.status(200).json({ admin, token: generateToken({ id: admin.id, level: 'admin' }) });
        }
      } else {
        let ccp = await Ccp.findOne({ where: { email: email } });
        if (ccp) {
          ccp = ccp.dataValues;
  
          let ok = validPassword(password, ccp.password);
  
          if (!ok)
            return res.status(500).json({ msg: 'Validation fails CCP' });
  
          else {
            ccp.password = undefined;           
            return res.status(200).json({ ccp, token: generateToken({ id: ccp.id, level: 'ccp' }) });
          }
        } else {
          let student = await Student.findOne({ where: { email: email } });
          if (student) {
            student = student.dataValues;
    
            let ok = validPassword(password, student.password);
    
            if (!ok)
              return res.status(500).json({ msg: 'Validation fails STUDENT' });
    
            else {
              student.password = undefined;           
              return res.status(200).json({ student, token: generateToken({ id: student.id, level: 'student' }) });
            }
          } else {
            let teacher = await Teacher.findOne({ where: { email: email } });
              if (teacher) {
                teacher = teacher.dataValues;
        
                let ok = validPassword(password, teacher.password);
                if (!ok)
                  return res.status(500).json({ msg: 'Validation fails TEACHER' });
        
                else {
                  teacher.password = undefined;           
                  return res.status(200).json({ teacher, token: generateToken({ id: teacher.id, level: 'teacher' }) });
                }
              } 
            }
        }
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Validation fails' });
    }
  },
}




