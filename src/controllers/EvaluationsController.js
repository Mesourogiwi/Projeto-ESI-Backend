const Evaluation = require('../models/Evaluation');
const Forms = require('../models/Forms');

module.exports = {
    async index (req, res) {
        const result = await Evaluation.findAll({
            include: [
                {model: Forms}
            ]
        });

        return res.json(result);
    },
    async indexById(req, res) {
        const {id} = req.params;

        if (!id || id == null || id == undefined)
        return res.status(400).json({ msg: 'CCP ID is invalid' });

        try {
            const result = await Evaluation.findByPk(id, {
                include: [
                    {model: Forms}
                ]
            });
    
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
    },
    async store(req, res) {

        const {forms_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation} = req.body;

        // arrumar verificações
        if (!forms_id || forms_id == null || forms_id == undefined)
        return res.status(400).json({ msg: 'Forms ID is invalid' });
        if (!status || status == null || status == undefined)
        return res.status(400).json({ msg: 'Status is invalid' });
        if (!comentario_ccp || comentario_ccp == null || comentario_ccp == undefined)
        return res.status(400).json({ msg: 'Comentario CCP is invalid' });
        if (!avaliacao_ccp || avaliacao_ccp == null || avaliacao_ccp == undefined)
        return res.status(400).json({ msg: 'Avaliação CCP is invalid' });
        if (!comentario_orientador || comentario_orientador == null || comentario_orientador == undefined)
        return res.status(400).json({ msg: 'Comentario Orientador is invalid' });
        if (!avaliacao_orientador || avaliacao_orientador == null || avaliacao_orientador == undefined)
        return res.status(400).json({ msg: 'Avaliacao Orientador is invalid' });
        if (!is_reavaliation || is_reavaliation == null || is_reavaliation == undefined)
        return res.status(400).json({ msg: 'Is Reavaliation is invalid' });

        try {
            const result = await Evaluation.create({forms_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation});

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
    },
    async edit(req, res) {
        const{id, forms_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation} = req.body;
        
        if (!id || id == null || id == undefined)
        return res.status(400).json({ msg: 'ID is invalid' });
        if (!forms_id || forms_id == null || forms_id == undefined)
        return res.status(400).json({ msg: 'Forms ID is invalid' });
        if (!status || status == null || status == undefined)
        return res.status(400).json({ msg: 'Status is invalid' });
        if (!comentario_ccp || comentario_ccp == null || comentario_ccp == undefined)
        return res.status(400).json({ msg: 'Comentario CCP is invalid' });
        if (!avaliacao_ccp || avaliacao_ccp == null || avaliacao_ccp == undefined)
        return res.status(400).json({ msg: 'Avaliação CCP is invalid' });
        if (!comentario_orientador || comentario_orientador == null || comentario_orientador == undefined)
        return res.status(400).json({ msg: 'Comentario Orientador is invalid' });
        if (!avaliacao_orientador || avaliacao_orientador == null || avaliacao_orientador == undefined)
        return res.status(400).json({ msg: 'Avaliacao Orientador is invalid' });
        if (!is_reavaliation || is_reavaliation == null || is_reavaliation == undefined)
        return res.status(400).json({ msg: 'Is Reavaliation is invalid' });

        try {
            const result = await Evaluation.findByPk(id);

            const afterUpdate = await result.update({forms_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation});

            return res.status(500).json(afterUpdate);
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
        


    },
    async delete(req, res) {
        const {id} = req.params;

        if (!id || id == null || id == undefined)
        return res.status(400).json({ msg: 'Evaluation ID is invalid' });

        try {
            const evaluation = await Evaluation.findByPk(id);
            if (!evaluation) {
                return res.status(404).json({ msg: 'Evaluation not found' });
            }

            await evaluation.destroy(evaluation);

            res.status(200).json({ msg: 'Evaluation successfully deleted' });

        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
        
    }
}