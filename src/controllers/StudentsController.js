const Students = require('../models/Students')

module.exports = {
    async index(req, res) {
        const result = await Students.findAll()

        return res.json(result);
    },
    async indexById(req, res) {
        const {id} = req.params;

        const result = await Students.findByPk(id);

        return res.json(result);
    },
    async store(req, res) {

        const {name, email, password, usp_number, lattes} = req.body;

        const result = await Students.create({name, email, password, usp_number, lattes});

        return res.json(result);
    },
    async edit(req, res) {
        const{id, name, email, password, usp_number, lattes} = req.body;
        
        const result = await Students.findByPk(id);

        const afterUpdate = await result.update({name, email, password, usp_number, lattes});

        return res.json(afterUpdate);


    },
    async delete(req, res) {
        const {id} = req.params;

        const result = await Students.findByPk(id);

        await result.destroy(result);

        return res.json();
    }
}