const { Model, DataTypes } = require('sequelize');

class Avaliations extends Model {
  static init(connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status: DataTypes.STRING,
      comentario_CCP: DataTypes.STRING,
      avaliacao_CCP: DataTypes.STRING, 
      comentario_orientador: DataTypes.STRING,
      avaliacao_orientador: DataTypes.STRING,
      is_reavaliation: DataTypes.BOOLEAN,
    }, {
      sequelize: connection,
    })
  }
  static associate(models) {
    this.belongsTo(models.Students, { foreignKey: 'studentId', as: 'students' });
    this.hasMany(models.Forms, { foreignKey: 'avaliationId', as: 'forms' });
  }
}

module.exports = Avaliations;