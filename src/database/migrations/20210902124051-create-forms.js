'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('forms', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      qual_curso: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nome_orientador: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link_curriculo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_latte: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ultimo_relatorio: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ultimo_semestre: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      disciplinas_obrigatorias: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      disciplinas_optativas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      conceitos_disciplinas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      optativas_aprovadas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      congresso_exterior: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      congresso_interior: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estagio_pesquisa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      disciplinas_reprovadas_mestrado: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      disciplinas_reprovadas_curso: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      exame_idiomas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      exame_qualificacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      limite_qualificacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      artigos_aceitos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      artigos_aguardando: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      artigos_preparacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      estagio_pesquisa_exterior: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      declarar_ccp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      comentarios_orientando: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teacher');
  },
};