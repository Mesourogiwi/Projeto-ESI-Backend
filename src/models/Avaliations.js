const { Model, DataTypes } = require('sequelize');

class Avaliations extends Model {
  static init(connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      forms_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      comentario_ccp: DataTypes.STRING,
      avaliacao_ccp: DataTypes.STRING, 
      comentario_orientador: DataTypes.STRING,
      avaliacao_orientador: DataTypes.STRING,
      is_reavaliation: DataTypes.TINYINT,
    }, {
      sequelize: connection,
    })
  }
  static associate(models) {
    this.belongsTo(models.Forms, { foreignKey: 'forms_id'});
  }
}

module.exports = Avaliations;