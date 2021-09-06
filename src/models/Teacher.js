const { Model, DataTypes } = require('sequelize');

class Teacher extends Model {
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
      student_id: DataTypes.INTEGER
    }, {
      sequelize: connection,
      tableName: 'teacher'
    })
  }
  static associate(models) {
    this.belongsTo(models.Students, { foreignKey: 'student_id'});
  }
}

module.exports = Teacher;