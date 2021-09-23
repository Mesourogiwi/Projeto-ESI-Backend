const Evaluation = require('../models/Evaluation');
const Forms = require('../models/Forms');
const Student = require('../models/Student');

const nodemailer = require('nodemailer');
const SMTP_CONFIG = require('../config/smtp');

const { CCP_LEVEL, ADMIN_LEVEL, TEACHER_LEVEL, STUDENT_LEVEL } = require('../config/token');

module.exports = {
    async index (req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL) {
            const result = await Evaluation.findAll();

            return res.json(result);
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async indexById(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL || req.level === STUDENT_LEVEL) {
            const {id} = req.params;

            if (!id)
            return res.status(400).json({ msg: 'ID is invalid' });

            try {
                const result = await Evaluation.findByPk(id);
        
                return res.status(200).json(result);
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async store(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL ) {
            const {forms_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation} = req.body;

            if (!forms_id || !status || !comentario_ccp || !avaliacao_ccp || !comentario_orientador || !avaliacao_orientador || !is_reavaliation)
            return res.status(400).json({ msg: 'Input is invalid' });
            try {
                const result = await Evaluation.create({forms_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation});

                const forms = await Forms.findByPk(forms_id);
                const student = await Student.findByPk(forms.student_id);

                //envio de email
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
          
                  transporter.sendMail({
                    subject: 'Avaliação do pedido de entrada no programa de pós graduação USP',
                    from: 'Programa de Pós Graduação em Sistema da Informação - USP',
                    to: [`${student.email}`],
                    html: ` <p>
                              Olá ${student.name}, sua avaliação para o Programa de Pós Graduação em Sistema da Informação - USP foi concluído.
                              <br/>
                            </p>`
                  }); 
                  
                return res.status(200).json(result);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async edit(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL) {
            const{id, forms_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation} = req.body;

            try {
                const result = await Evaluation.findByPk(id);

                const afterUpdate = await result.update({forms_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation});

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
            return res.status(400).json({ msg: 'Evaluation ID is invalid' });

            try {
                const result = await Evaluation.findByPk(id);
                if (!result) {
                    return res.status(404).json({ msg: 'Evaluation not found' });
                }

                await result.destroy(result);

                return res.status(200).json({ msg: 'Evaluation successfully deleted' });

            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    }
}