const { Model, DataTypes } = require('sequelize');

class Student extends Model {
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
      lattes: DataTypes.STRING,
      teacher_id: DataTypes.INTEGER,
    }, {
      sequelize: connection,
      tableName: "student"
    })
  }
  static associate(models) {
    this.belongsTo(models.Teacher, { foreignKey: 'teacherId', as: 'teacher' });
    this.hasMany(models.Evaluation, { foreignKey: 'studentId', as: 'evaluation' });
  }
}

module.exports = Student;