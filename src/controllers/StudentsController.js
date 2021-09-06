const Students = require('../models/Students')
const Avaliation = require('../models/Avaliations')

module.exports = {
    async index(req, res) {
        const result = await Students.findAll({
            include: [
                {model: Avaliation}
            ]
        })

        return res.json(result);
    },
    async indexById(req, res) {
        const {id} = req.params;

        const result = await Students.findByPk(id, {
            include: [
                {model: Avaliation}
            ]
        });

        return res.json(result);
    },
    async store(req, res) {

        console.log(req.body)

        const {name, email, password, usp_number, lattes, avaliation_id} = req.body;

        const result = await Students.create({name, email, password, usp_number, lattes, avaliation_id});

        return res.json(result);
    },
    async edit(req, res) {
        const{name, email, password, usp_number, lattes, avaliation_id} = req.body;
        
        const result = await Students.findByPk(id);

        const afterUpdate = await result.update({name, email, password, usp_number, lattes, avaliation_id});

        return res.json(afterUpdate);


    },
    async delete(req, res) {
        const {id} = req.params;

        const result = await Students.findByPk(id);

        await result.destroy(result);

        return res.json();
    }
}