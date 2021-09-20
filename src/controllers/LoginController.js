const Admin = require('../models/Admin');
const Ccp = require('../models/Ccp');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const validPassword = (password, hash) => bcrypt.compareSync(password, hash);

const generateToken = (params = {}) => jwt.sign(params, authConfig.secret, {
  expiresIn: 8000, //um dia
});


module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || email == null || email == undefined)
      return res.status(400).json({ msg: 'Email is invalid' });

    if (!password || password == null || password == undefined)
      return res.status(400).json({ msg: 'Password is invalid' });

    try {
      let enterprise = await Enterprise.findOne({ where: { email_emp: email } });
      if (enterprise) {
        enterprise = enterprise.dataValues

        if (enterprise.stat_emp == 'I' || enterprise.stat_emp == 'i')
          return res.status(401).json({ msg: 'Unauthorized Access' });

        let ok = validPassword(password, enterprise.password);

        if (!ok)
          return res.status(500).json({ msg: 'Validation fails' });

        else {

          let enterprise = await Enterprise.findOne({
            include: [{
              association: 'user',
              where: { email: email }
            }],
          });
          enterprise = enterprise.dataValues;
          user = enterprise.user[0].dataValues;
          enterprise.user = undefined;
          let ok = validPassword(password, enterprise.password);

          if (!ok) {
            return res.status(401).json({ msg: 'Password Incorrect' });
          }

          user.password = undefined;
          enterprise.password = undefined;
          enterprise.password_reset_token = undefined;
          user.password_reset_token = undefined;

          const userId = user.id, enterpriseId = enterprise.id;

          const query = mysql.format('SELECT * FROM heroku_38ce0ccdfb1e57f.`analysts-users` WHERE `user_id` = ? AND `enterprise_id` = ?', [userId, enterpriseId]);
          connection.query(query);

          const [analysts] = await connection.query(query);

          return res.status(200).json({ enterprise, user, analysts, token: generateToken({ id: enterprise.id, level: 'enterprise' }) });
        }
      }
      else {
        let enterprise = await Enterprise.findOne({
          include: [{
            association: 'user',
            where: { email: email }
          }],
        });

        if (enterprise) {
          enterprise = enterprise.dataValues;
          user = enterprise.user[0].dataValues;
          enterprise.user = undefined;
          let ok = validPassword(password, user.password);

          if (!ok) {
            return res.status(500).json({ msg: 'Validation fails' });
          }

          user.password = undefined;
          enterprise.password = undefined;
          enterprise.password_reset_token = undefined;
          user.password_reset_token = undefined;

          const userId = user.id, enterpriseId = enterprise.id;

          const query = mysql.format('SELECT * FROM heroku_38ce0ccdfb1e57f.`analysts-users` WHERE `user_id` = ? AND `enterprise_id` = ?', [userId, enterpriseId]);
          connection.query(query); //heroku_38ce0ccdfb1e57f

          const [analysts] = await connection.query(query);

          return res.status(200).json({ enterprise, user, analysts, token: generateToken({ id: user.id, level: 'user' }) });
        }
        else {
          let department = await Department.findOne({
            include: [{
              association: 'manager',
              where: { email: email }
            }],
          });

          if (department) {
            department = department.dataValues;
            manager = department.manager[0].dataValues;
            department.manager = undefined;
            let ok = validPassword(password, manager.password);

            if (!ok) {
              return res.status(500).json({ msg: 'Validation fails' });
            }

            manager.password = undefined;
            department.password = undefined;
            department.password_reset_token = undefined;
            manager.password_reset_token = undefined;

            return res.status(200).json({ department, manager, token: generateToken({ id: manager.id, level: 'manager' }) });
          }
          else {
            let department = await Department.findOne({
              include: [{
                association: 'leader',
                where: { email: email }
              }],
            });

            if (department) {
              department = department.dataValues;
              leader = department.leader[0].dataValues;
              department.leader = undefined;
              let ok = validPassword(password, leader.password);

              if (!ok) {
                return res.status(500).json({ msg: 'Validation fails' });
              }

              leader.password = undefined;
              department.password = undefined;
              department.password_reset_token = undefined;
              leader.password_reset_token = undefined;

              return res.status(200).json({ department, leader, token: generateToken({ id: leader.id, level: 'leader' }) });
            }
            else {
              let department = await Department.findOne({
                include: [{
                  association: 'analyst',
                  where: { email: email }
                }],
              });

              if (department) {
                department = department.dataValues;
                analyst = department.analyst[0].dataValues;
                department.analyst = undefined;
                let ok = validPassword(password, analyst.password);

                if (!ok) {
                  return res.status(500).json({ msg: 'Validation fails' });
                }

                analyst.password = undefined;
                department.password = undefined;
                department.password_reset_token = undefined;
                analyst.password_reset_token = undefined;

                return res.status(200).json({ department, analyst, token: generateToken({ id: analyst.id, level: 'analyst' }) });
              }
              else {
                let administrator = await Administrator.findOne({ where: { email: email } });
                if (administrator) {
                  administrator = administrator.dataValues;

                  let ok = validPassword(password, administrator.password);

                  if (!ok) {
                    return res.status(500).json({ msg: 'Validation fails' });
                  }

                  administrator.password = undefined;
                  administrator.password_reset_token = undefined;

                  return res.status(200).json({ administrator, token: generateToken({ id: administrator.id, level: 'administrator' }) });
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Validation fails' });
    }
  },

  async forgotPassword(req, res) {

    const { email } = req.body;

    if (!email || email == null || email == undefined)
      return res.status(400).json({ msg: 'Email is invalid' });

    try {
      let enterprise = await Enterprise.findOne({ where: { email_emp: email } });
      if (enterprise) {

        const transporter = nodemailer.createTransport({
          host: SMTP_CONFIG.host,
          port: SMTP_CONFIG.port,
          secure: false,
          auth: {
            user: SMTP_CONFIG.user,
            pass: SMTP_CONFIG.pass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const password_reset_token = crypto.randomBytes(4).toString('HEX');

        transporter.sendMail({
          subject: 'Recuperação de Senha',
          from: `${email.nome_emp}`,
          to: [`${email}`],
          html: `<p>Olá ${email}, seu token para recuperção de senha é: ${password_reset_token}</p><br/><a href="https://front-somacontabilidade.netlify.app/">Sistema Soma Contabilidade</a>`
        }).then(
          () => {
            bcrypt.hash(password_reset_token, 8).then(
              password_reset_token => {
                enterprise.update({
                  password_reset_token: password_reset_token,
                  //password_reset_expires: data da atualização,
                }).then(
                  () => {
                    return res.status(200).json({ message: 'Email sended' });
                  }
                ).catch(
                  () => {
                    return res.status(404).json({ message: 'User not found' });
                  })
              })
          }
        ).catch(
          () => {
            return res.status(404).json({ message: 'Fail to send email' });
          }
        )
      }
      else {
        let enterprise = await Enterprise.findOne({
          include: [{
            association: 'user',
            where: { email: email }
          }],
        });

        if (!enterprise)
          return res.status(404).json({ message: 'Not Found' });

        user = enterprise.user[0];

        const transporter = nodemailer.createTransport({
          host: SMTP_CONFIG.host,
          port: SMTP_CONFIG.port,
          secure: false,
          auth: {
            user: SMTP_CONFIG.user,
            pass: SMTP_CONFIG.pass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const password_reset_token = crypto.randomBytes(4).toString('HEX');

        transporter.sendMail({
          subject: 'Recuperação de Senha',
          from: `${email.nome_emp}`,
          to: [`${email}`],
          html: `<p>Olá ${email}, seu token para recuperção de senha é: ${password_reset_token}</p><br/><a href="https://front-somacontabilidade.netlify.app/">Sistema Soma Contabilidade</a>`
        }).then(

          () => {

            bcrypt.hash(password_reset_token, 8).then(
              password_reset_token => {
                user.update({
                  password_reset_token: password_reset_token,
                  //password_reset_expires: data da atualização,
                }).then(
                  () => {
                    return res.status(200).json({ message: 'Email sended' });
                  }
                ).catch(
                  () => {
                    return res.status(404).json({ message: 'User not found' });
                  }
                )
              }
            )
          }
        ).catch(
          () => {
            return res.status(404).json({ message: 'Fail to send email' });
          }
        )
      }
    } catch (error) {
      return res.status(404).json({ message: 'Not Found' })
    }
  },


  async validToken(req, res) {

    const { token, email } = req.body;

    if (!token || token == null || token == undefined)
      return res.status(400).json({ msg: 'Token is invalid' });

    if (!email || email == null || email == undefined)
      return res.status(400).json({ msg: 'Email is invalid' });

    try {

      let enterprise = await Enterprise.findOne({ where: { email_emp: email } });

      if (enterprise) {
        let ok = validToken(token, enterprise.password_reset_token);
        if (!ok)
          return res.status(500).json({ msg: 'Validation fails' });

        validUpdate = 1;

        await enterprise.update({
          valid_update_password: validUpdate,
        })

        return res.status(200).json({ message: 'Token Valid' });
      }
      else {
        let enterprise = await Enterprise.findOne({
          include: [{
            association: 'user',
            where: { email: email }
          }],
        });

        if (!enterprise)
          return res.status(404).json({ message: 'Not Found' });

        user = enterprise.user[0];

        let ok = validToken(token, user.password_reset_token);
        if (!ok)
          return res.status(500).json({ msg: 'Validation fails' });

        validUpdate = 1;

        await user.update({
          valid_update_password: validUpdate,
        })

        return res.status(200).json({ message: 'Token Valid' });
      }

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Fails' })
    }
  },

  async updatePassword(req, res) {
    const { email, newPassword } = req.body;

    if (!newPassword || newPassword == null || newPassword == undefined)
      return res.status(400).json({ msg: 'New Password is invalid' });


    if (!email || email == null || email == undefined)
      return res.status(400).json({ msg: 'Email is invalid' });

    try {
      const enterprise = await Enterprise.findOne({ where: { email_emp: email } });

      if (enterprise) {
        if (enterprise.valid_update_password == 1) {

          const hash = generateNewHash(newPassword);

          await enterprise.update({
            password: hash,
            valid_update_password: 0,
          })

          return res.status(200).json({ message: 'Password Updated Successfully' })
        }
        else return res.status(401).json({ msg: 'Update Password not authorized' });
      }
      else {
        let enterprise = await Enterprise.findOne({
          include: [{
            association: 'user',
            where: { email: email }
          }],
        });

        if (!enterprise)
          return res.status(404).json({ message: 'Not Found' });

        user = enterprise.user[0];

        if (user.valid_update_password == 1) {

          const hash = generateNewHash(newPassword);

          await user.update({
            password: hash,
            valid_update_password: 0,
          })

          return res.status(200).json({ message: 'Password Updated Successfully' })
        }
        else return res.status(401).json({ msg: 'Update Password not authorized' });

      }

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Fails' });
    }
  }
}




