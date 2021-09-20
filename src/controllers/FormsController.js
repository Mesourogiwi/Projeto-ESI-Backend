const Forms = require('../models/Forms')

module.exports = {
    async index(req, res) {
        const result = await Forms.findAll();

        return res.json(result);
    },
    async indexById(req, res) {
        const {id} = req.params;

        if (!id)
        return res.status(400).json({ msg: 'Input is invalid' });
        try {
            const result = await Forms.findByPk(id);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }
        
    },
    async store(req, res) {

        const {qual_curso, nome_orientador, link_curriculo, data_latte, ultimo_relatorio, ultimo_semestre, 
            disciplinas_obrigatorias, disciplinas_optativas, conceitos_disciplinas, optativas_apravadas, congresso_exterior, 
            congresso_interior, estagio_pesquisa, disciplinas_reprovadas_mestrado, disciplinas_reprovadas_curso, exame_idiomas,
            exame_qualificacao, limite_qualificacao, artigos_aceitos, artigos_aguardando, artigos_preparacao, estagio_pesquisa_exterior,
            declarar_ccp, comentarios_orientando} = req.body;

        if (!qual_curso || !nome_orientador || !link_curriculo || !data_latte || !ultimo_relatorio || !ultimo_semestre || 
            !disciplinas_obrigatorias || !disciplinas_optativas || !conceitos_disciplinas || !optativas_apravadas || !congresso_exterior ||
            !congresso_interior || !estagio_pesquisa || !disciplinas_reprovadas_mestrado || !disciplinas_reprovadas_curso || 
            !exame_idiomas || !exame_qualificacao || !limite_qualificacao || !artigos_aceitos || !artigos_aguardando || !artigos_preparacao || 
            !estagio_pesquisa_exterior || !declarar_ccp || !comentarios_orientando)
        return res.status(400).json({ msg: 'Input is invalid' });

        try {
            const result = await Forms.create({qual_curso, nome_orientador, link_curriculo, data_latte, ultimo_relatorio, ultimo_semestre, disciplinas_obrigatorias, disciplinas_optativas, conceitos_disciplinas, optativas_apravadas, congresso_exterior, congresso_interior, estagio_pesquisa, disciplinas_reprovadas_mestrado, disciplinas_reprovadas_curso, exame_idiomas, exame_qualificacao, limite_qualificacao, artigos_aceitos, artigos_aguardando, artigos_preparacao, estagio_pesquisa_exterior, declarar_ccp, comentarios_orientando});

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' });
        }

        
    },
    async edit(req, res) {
        const{id, qual_curso, nome_orientador, link_curriculo, data_latte, ultimo_relatorio, ultimo_semestre, disciplinas_obrigatorias, disciplinas_optativas, conceitos_disciplinas, optativas_apravadas, congresso_exterior, congresso_interior, estagio_pesquisa, disciplinas_reprovadas_mestrado, disciplinas_reprovadas_curso, exame_idiomas, exame_qualificacao, limite_qualificacao, artigos_aceitos, artigos_aguardando, artigos_preparacao, estagio_pesquisa_exterior, declarar_ccp, comentarios_orientando} = req.body;
        try {
            const result = await Forms.findByPk(id);

            const afterUpdate = await result.update({qual_curso, nome_orientador, link_curriculo, data_latte, ultimo_relatorio, ultimo_semestre, disciplinas_obrigatorias, disciplinas_optativas, conceitos_disciplinas, optativas_apravadas, congresso_exterior, congresso_interior, estagio_pesquisa, disciplinas_reprovadas_mestrado, disciplinas_reprovadas_curso, exame_idiomas, exame_qualificacao, limite_qualificacao, artigos_aceitos, artigos_aguardando, artigos_preparacao, estagio_pesquisa_exterior, declarar_ccp, comentarios_orientando});

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
            const result = await Forms.findByPk(id);

            await result.destroy(result);

            return res.status(200).json();
        } catch (error) {
            return res.status(500).json({ msg: 'Validation fails' }); 
        }
        
    }
}