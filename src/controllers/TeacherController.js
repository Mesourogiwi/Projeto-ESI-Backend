const Teacher = require('../models/Teacher')

module.exports = {
    async index(req, res) {
        const result = await Teacher.findAll()

        return res.json(result);
    },
    async indexById(req, res) {
        const {id} = req.params;

        const result = await Teacher.findByPk(id);

        return res.json(result);
    },
    async store(req, res) {
        console.log(req.body);
        const {name, email, password} = req.body;

        const result = await Teacher.create({name, email, password});

        return res.json(result);
    },
    async edit(req, res) {
        const {id} = req.params;
        const{name, email, password, usp_number, lattes} = req.body;
        
        const result = await Teacher.findByPk(id);

        const afterUpdate = await result.update({name, email, password, usp_number, lattes});

        return res.json(afterUpdate);


    },
    async delete(req, res) {
        const {id} = req.params;

        const result = await Teacher.findByPk(id);

        await result.destroy(result);

        return res.json();
    }
}