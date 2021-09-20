const Student = require('../models/Student')
const Evaluation = require('../models/Evaluation')

module.exports = {
    async index(req, res) {
        const result = await Student.findAll({
            include: [
                {model: Evaluation}
            ]
        })

        return res.json(result);
    },
    async indexById(req, res) {
        const {id} = req.params;

        if (!id)
        return res.status(400).json({ msg: 'Input is invalid' });

        try {
            const result = await Student.findByPk(id, {
                include: [
                    {model: Evaluation}
                ]
            });
    
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
    },
    async store(req, res) {
        const {name, email, password, usp_number, lattes, avaliation_id} = req.body;

        if (!name || !email || !password || !usp_number || !lattes || !avaliation_id)
        return res.status(400).json({ msg: 'Input is invalid' });

        try {
            const result = await Student.create({name, email, password, usp_number, lattes, avaliation_id});

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
    },
    async edit(req, res) {
        const{id, name, email, password, usp_number, lattes, avaliation_id} = req.body;        
        try {
            const result = await Student.findByPk(id);

        const afterUpdate = await result.update({name, email, password, usp_number, lattes, avaliation_id});

        return res.status(200).json(afterUpdate);
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }

    },
    async delete(req, res) {
        const {id} = req.params;

        if (!id)
        return res.status(400).json({ msg: 'Input is invalid' });

        try {
            const result = await Student.findByPk(id);

            await result.destroy(result);
    
            return res.status(200).json(); 
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
    }
}