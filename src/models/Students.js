const { Model, DataTypes } = require('sequelize');

class Students extends Model {
  static init(connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      usp_number: DataTypes.STRING,
      lattes: DataTypes.STRING
    }, {
      sequelize: connection,
    })
  }
  static associate(models) {
    this.belongsTo(models.Teacher, { foreignKey: 'teacherId', as: 'teacher' });
    this.hasMany(models.Avaliations, { foreignKey: 'studentId', as: 'avaliations' });
  }
}

module.exports = Students;