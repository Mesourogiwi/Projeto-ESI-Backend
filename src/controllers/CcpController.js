const CCP = require('../models/Ccp');
const Teacher = require('../models/Teacher');

module.exports = {
    async index (req, res) {
        const result = await CCP.findAll({
            include: [
                {model: Teacher}
            ]
        });

        return res.json(result);
    },
    async indexById(req, res) {
        const {id} = req.params;

        const result = await CCP.findByPk(id, {
            include: [
                {model: Teacher}
            ]
        });

        return res.json(result);
    },
    async store(req, res) {

        const {name, email, password, teacher_id} = req.body;

        const result = await CCP.create({name, email, password, teacher_id});

        return res.json(result);
    },
    async edit(req, res) {
        const{id, name, email, password, teacher_id} = req.body;
        
        const result = await CCP.findByPk(id);

        const afterUpdate = await result.update({name, email, password, teacher_id});

        return res.json(afterUpdate);


    },
    async delete(req, res) {
        const {id} = req.params;

        const result = await CCP.findByPk(id);

        await result.destroy(result);

        return res.json();
    }
}