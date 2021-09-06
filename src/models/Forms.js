const { Model, DataTypes } = require('sequelize');

class Forms extends Model {
  static init(connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      qual_curso: DataTypes.INTEGER,    
      nome_orientador: DataTypes.STRING,
      link_curriculo: DataTypes.STRING,
      data_latte: DataTypes.DATE,
      ultimo_relatorio: DataTypes.INTEGER,
      ultimo_semestre: DataTypes.INTEGER,
      disciplinas_obrigatorias: DataTypes.STRING,
      disciplinas_optativas: DataTypes.STRING,
      conceitos_disciplinas: DataTypes.INTEGER,
      optativas_apravadas: DataTypes.STRING,
      congresso_exterior: DataTypes.STRING,
      congresso_interior:DataTypes.STRING,
      estagio_pesquisa: DataTypes.STRING,
      disciplinas_reprovadas_mestrado:DataTypes.INTEGER,
      disciplinas_reprovadas_curso: DataTypes.INTEGER,
      exame_idiomas: DataTypes.INTEGER,
      exame_qualificacao:DataTypes.INTEGER,
      limite_qualificacao: DataTypes.INTEGER,
      artigos_aceitos: DataTypes.INTEGER,
      artigos_aguardando: DataTypes.INTEGER,
      artigos_preparacao: DataTypes.INTEGER,
      estagio_pesquisa_exterior: DataTypes.STRING,
      declarar_ccp: DataTypes.STRING,
      comentarios_orientando: DataTypes.STRING,
    }, {
      sequelize: connection,
    })
  }
  static associate(models) {
    this.belongsTo(models.Avaliations, { foreignKey: 'avaliationId', as: 'avaliations' });
  }
}

module.exports = Forms;