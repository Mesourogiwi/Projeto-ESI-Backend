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

        if (!id || id == null || id == undefined)
        return res.status(400).json({ msg: 'CCP ID is invalid' });

        try{

        const result = await CCP.findByPk(id, {
            include: [
                {model: Teacher}
            ]
        });

        return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
    },
    async store(req, res) {

        const {name, email, password} = req.body;

        if (!name || !email || !password )
        return res.status(400).json({ msg: 'Input is invalid' });

        try {
            
            const result = await CCP.create({name, email, password});

            return res.status(200).json(result);
        
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
    },

    async edit(req, res) {
        const{id, name, email, password, teacher_id} = req.body;

        //tirar de todos
        if (!id || !name || !email || !password || !teacher_id)
        return res.status(400).json({ msg: 'Input is invalid' });

        try {
            
            const ccp = await CCP.findByPk(id);
            if (!ccp) {
            return res.status(404).json({ msg: 'CCP not found' });
            }
            
            const afterUpdate = await ccp.update({name, email, password, teacher_id});
    
            return res.status(200).json(afterUpdate);
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
        
    },
    async delete(req, res) {
        const {id} = req.params;

        if (!id || id == null || id == undefined)
        return res.status(400).json({ msg: 'CCP ID is invalid' });

        try {
            const ccp = await CCP.findByPk(id);
            if (!ccp) {
                return res.status(404).json({ msg: 'CCP not found' });
            }

            await ccp.destroy(ccp);

            res.status(200).json({ msg: 'CCP successfully deleted' });
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
        
    }
}