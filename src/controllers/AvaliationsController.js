const Avaliations = require('../models/Avaliations');
const Forms = require('../models/Forms')

module.exports = {
    async index (req, res) {
        const result = await Avaliations.findAll({
            include: [
                {model: Forms}
            ]
        });

        return res.json(result);
    },
    async indexById(req, res) {
        const {id} = req.params;

        const result = await Avaliations.findByPk(id, {
            include: [
                {model: Forms}
            ]
        });

        return res.json(result);
    },
    async store(req, res) {

        console.log(req.body)

        const {forms_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation} = req.body;

        const result = await Avaliations.create({forms_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation});

        return res.json(result);
    },
    async edit(req, res) {
        const{id, forms_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation} = req.body;
        
        const result = await Avaliations.findByPk(id);

        const afterUpdate = await result.update({forms_id, status, comentario_ccp, avaliacao_ccp, comentario_orientador, avaliacao_orientador, is_reavaliation});

        return res.json(afterUpdate);


    },
    async delete(req, res) {
        const {id} = req.params;

        const result = await Avaliations.findByPk(id);

        await result.destroy(result);

        return res.json();
    }
}