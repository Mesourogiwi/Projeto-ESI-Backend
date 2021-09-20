const Evaluation = require('../models/Evaluation');

const { CCP_LEVEL, ADMIN_LEVEL, TEACHER_LEVEL, STUDENT_LEVEL } = require('../config/token');

module.exports = {
    async index (req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL) {
            const result = await Evaluation.findAll({
                include: [{ association: 'forms' }]
                });

            return res.json(result);
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async indexById(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL || req.level === STUDENT_LEVEL) {
            const {id} = req.params;

            if (!id || id == null || id == undefined)
            return res.status(400).json({ msg: 'CCP ID is invalid' });

            try {
                const result = await Evaluation.findByPk(id, {
                    include: [{ association: 'forms' }]
                    });
        
                return res.status(200).json(result);
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async store(req, res) {

        const {student_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation} = req.body;

        if (!student_id || !status || !comentario_ccp || !avaliacao_ccp || !comentario_orientador || !avaliacao_orientador || !is_reavaliation)
        return res.status(400).json({ msg: 'Input is invalid' });
        try {
            const result = await Evaluation.create({student_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation});

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
    },
    async edit(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL) {
            const{id, student_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation} = req.body;

            try {
                const result = await Evaluation.findByPk(id);

                const afterUpdate = await result.update({student_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation});

                return res.status(200).json(afterUpdate);
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async delete(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL) {
            const {id} = req.params;

            if (!id || id == null || id == undefined)
            return res.status(400).json({ msg: 'Evaluation ID is invalid' });

            try {
                const result = await Evaluation.findByPk(id);
                if (!result) {
                    return res.status(404).json({ msg: 'Evaluation not found' });
                }

                await result.destroy(result);

                res.status(200).json({ msg: 'Evaluation successfully deleted' });

            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    }
}