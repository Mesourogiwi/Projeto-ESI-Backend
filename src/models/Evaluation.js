const { Model, DataTypes } = require('sequelize');

class Evaluation extends Model {
  static init(connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status: DataTypes.STRING,
      comentario_ccp: DataTypes.STRING,
      avaliacao_ccp: DataTypes.STRING, 
      comentario_orientador: DataTypes.STRING,
      avaliacao_orientador: DataTypes.STRING,
      is_reavaliation: DataTypes.TINYINT,
      forms_id: DataTypes.INTEGER,
    }, {
      sequelize: connection,
      tableName: "evaluation"
    })
  }
  static associate(models) {
    this.belongsTo(models.Forms, { foreignKey: 'formsId', as: 'forms' });
  }
}

module.exports = Evaluation;