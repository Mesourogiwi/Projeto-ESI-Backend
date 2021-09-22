const Forms = require('../models/Forms')

const { CCP_LEVEL, ADMIN_LEVEL, TEACHER_LEVEL, STUDENT_LEVEL } = require('../config/token');

module.exports = {
    async index(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL) {
            const result = await Forms.findAll();
            return res.json(result);
        } else return res.status(401).json({ msg: 'Token Invalid' });
    },
    async indexById(req, res) {
        if (req.level === ADMIN_LEVEL || req.level === CCP_LEVEL || req.level === TEACHER_LEVEL || req.level === STUDENT_LEVEL) {
            const {id} = req.params;

            if (!id)
            return res.status(400).json({ msg: 'Input is invalid' });
            try {
                const result = await Forms.findByPk(id);

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

                if (!student_id )
                return res.status(400).json({ msg: 'student_id is invalid' });
                if (!qual_curso )
                return res.status(400).json({ msg: 'qual_curso is invalid' });
                if (!nome_orientador) 
                return res.status(400).json({ msg: 'nome_orientador is invalid' });
                if (!link_curriculo  )
                return res.status(400).json({ msg: 'link_curriculo is invalid' });
                if (!data_latte )
                return res.status(400).json({ msg: 'data_latte is invalid' });
                if (!ultimo_relatorio )
                return res.status(400).json({ msg: 'ultimo_relatorio is invalid' });
                if (!ultimo_semestre  )
                return res.status(400).json({ msg: 'ultimo_semestre is invalid' });
                if (!disciplinas_obrigatorias ) 
                return res.status(400).json({ msg: 'disciplinas_obrigatorias is invalid' });
                if (!disciplinas_optativas  )
                return res.status(400).json({ msg: 'disciplinas_optativas is invalid' });
                if (!conceitos_disciplinas  )
                return res.status(400).json({ msg: 'conceitos_disciplinas is invalid' });
                if (!congresso_exterior )
                return res.status(400).json({ msg: 'congresso_exterior is invalid' });
                if (!congresso_interior  )
                return res.status(400).json({ msg: 'congresso_interior is invalid' });
                if (!estagio_pesquisa  )
                return res.status(400).json({ msg: 'estagio_pesquisa is invalid' });
                if (!disciplinas_reprovadas_mestrado )
                return res.status(400).json({ msg: 'disciplinas_reprovadas_mestrado is invalid' });
                if (!disciplinas_reprovadas_curso  )
                return res.status(400).json({ msg: 'disciplinas_reprovadas_curso is invalid' });
                if (!exame_idiomas  )
                return res.status(400).json({ msg: 'exame_idiomas is invalid' });
                if (!exame_qualificacao)  
                return res.status(400).json({ msg: 'exame_qualificacao is invalid' });
                if (!limite_qualificacao ) 
                return res.status(400).json({ msg: 'limite_qualificacao is invalid' });
                if (!artigos_aceitos  )
                return res.status(400).json({ msg: 'artigos_aceitos is invalid' });
                if (!artigos_aguardando)  
                return res.status(400).json({ msg: 'artigos_aguardando is invalid' });
                if (!artigos_preparacao ) 
                return res.status(400).json({ msg: 'artigos_preparacao is invalid' });
                if (!estagio_pesquisa_exterior) 
                return res.status(400).json({ msg: 'estagio_pesquisa_exterior is invalid' });
                if (!declarar_ccp )
                return res.status(400).json({ msg: 'declarar_ccp is invalid' });
                if (!comentarios_orientando)
                return res.status(400).json({ msg: 'comentarios_orientando is invalid' });

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

                return res.status(200).json();
            } catch (error) {
                return res.status(500).json({ msg: 'Validation fails' }); 
            }
        } else return res.status(401).json({ msg: 'Token Invalid' });
    }
}