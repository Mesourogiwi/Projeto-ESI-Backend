const Forms = require('../models/Forms')

const { CCP_LEVEL, ADMIN_LEVEL, TEACHER_LEVEL, STUDENT_LEVEL } = require('../config/token');

module.exports = {
    async index(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL) {
            const result = await Forms.findAll({
                include: [{ association: 'evaluation' }]
                });
            return res.json(result);
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async indexById(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL || req.level === STUDENT_LEVEL) {
            const {id} = req.params;

            if (!id)
            return res.status(400).json({ msg: 'Input is invalid' });
            try {
                const result = await Forms.findByPk(id, {
                    include: [{ association: 'evaluation' }]
                    });

                return res.status(200).json(result);
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async store(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL || req.level === STUDENT_LEVEL) {
            const {student_id, qual_curso, nome_orientador, link_curriculo, data_latte, ultimo_relatorio, ultimo_semestre, 
            disciplinas_obrigatorias, disciplinas_optativas, conceitos_disciplinas, congresso_exterior, 
            congresso_interior, estagio_pesquisa, disciplinas_reprovadas_mestrado, disciplinas_reprovadas_curso, exame_idiomas,
            exame_qualificacao, limite_qualificacao, artigos_aceitos, artigos_aguardando, artigos_preparacao, estagio_pesquisa_exterior,
            declarar_ccp, comentarios_orientando} = req.body;
            if (!student_id ||!qual_curso || !nome_orientador || !link_curriculo || !data_latte || !ultimo_relatorio || !ultimo_semestre || 
                !disciplinas_obrigatorias || !disciplinas_optativas || !conceitos_disciplinas || !congresso_exterior ||
                !congresso_interior || !estagio_pesquisa || !disciplinas_reprovadas_mestrado || !disciplinas_reprovadas_curso || 
                !exame_idiomas || !exame_qualificacao || !limite_qualificacao || !artigos_aceitos || !artigos_aguardando || !artigos_preparacao || 
                !estagio_pesquisa_exterior || !declarar_ccp || !comentarios_orientando)
            return res.status(400).json({ msg: 'Input is invalid' });
            try {
                const result = await Forms.create({student_id, qual_curso, nome_orientador, link_curriculo, data_latte, ultimo_relatorio, ultimo_semestre, disciplinas_obrigatorias, disciplinas_optativas, conceitos_disciplinas, congresso_exterior, congresso_interior, estagio_pesquisa, disciplinas_reprovadas_mestrado, disciplinas_reprovadas_curso, exame_idiomas, exame_qualificacao, limite_qualificacao, artigos_aceitos, artigos_aguardando, artigos_preparacao, estagio_pesquisa_exterior, declarar_ccp, comentarios_orientando});

                return res.status(200).json(result);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async edit(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL || req.level === STUDENT_LEVEL) {
            const{id, student_id, qual_curso, nome_orientador, link_curriculo, data_latte, ultimo_relatorio, ultimo_semestre, disciplinas_obrigatorias, disciplinas_optativas, conceitos_disciplinas, congresso_exterior, congresso_interior, estagio_pesquisa, disciplinas_reprovadas_mestrado, disciplinas_reprovadas_curso, exame_idiomas, exame_qualificacao, limite_qualificacao, artigos_aceitos, artigos_aguardando, artigos_preparacao, estagio_pesquisa_exterior, declarar_ccp, comentarios_orientando} = req.body;
            try {
                const result = await Forms.findByPk(id);

                const afterUpdate = await result.update({student_id, qual_curso, nome_orientador, link_curriculo, data_latte, ultimo_relatorio, ultimo_semestre, disciplinas_obrigatorias, disciplinas_optativas, conceitos_disciplinas, congresso_exterior, congresso_interior, estagio_pesquisa, disciplinas_reprovadas_mestrado, disciplinas_reprovadas_curso, exame_idiomas, exame_qualificacao, limite_qualificacao, artigos_aceitos, artigos_aguardando, artigos_preparacao, estagio_pesquisa_exterior, declarar_ccp, comentarios_orientando});

                return res.status(200).json(afterUpdate);
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' });
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async delete(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL || req.level === STUDENT_LEVEL) {
            const {id} = req.params;

            if (!id)
            return res.status(400).json({ msg: 'Input is invalid' });

            try {
                const result = await Forms.findByPk(id);

                await result.destroy(result);

                return res.status(200).json({ msg: 'Forms successfully deleted' });
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' }); 
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    }
}