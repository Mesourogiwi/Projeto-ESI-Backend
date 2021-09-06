const Teacher = require('../models/Teacher')
const Student = require('../models/Students')

module.exports = {
    async index(req, res) {
        const result = await Teacher.findAll({
            include: [
                {model: Student}
            ]
        })

        return res.json(result);
    },
    async indexById(req, res) {
        const {id} = req.params;

        const result = await Teacher.findByPk(id, {
            include: [
                {model: Student}
            ]
        });

        return res.json(result);
    },
    async store(req, res) {
        console.log(req.body);
        const {name, email, password, student_id} = req.body;

        const result = await Teacher.create({name, email, password, student_id});

        return res.json(result);
    },
    async edit(req, res) {
        const{id, name, email, password, student_id} = req.body;
        
        const result = await Teacher.findByPk(id);

        const afterUpdate = await result.update({name, email, password, student_id});

        return res.json(afterUpdate);


    },
    async delete(req, res) {
        const {id} = req.params;

        const result = await Teacher.findByPk(id);

        await result.destroy(result);

        return res.json();
    }
}