const { Model, DataTypes } = require('sequelize');

class Teacher extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize: connection,
    })
  }
}

module.exports = Teacher;