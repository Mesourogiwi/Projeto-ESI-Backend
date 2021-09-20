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
      ccp_id: DataTypes.INTEGER
    }, {
      sequelize: connection,
      tableName: 'teacher'
    })
  }
  static associate(models) {
    this.belongsTo(models.Ccp, { foreignKey: 'ccpId', as: 'ccp' });
    this.hasMany(models.Student, { foreignKey: 'teacherId', as: 'student' });
  }
}

module.exports = Teacher;