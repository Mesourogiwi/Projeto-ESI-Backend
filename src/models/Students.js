const { Model, DataTypes } = require('sequelize');

class Students extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      usp_number: DataTypes.STRING,
      lattes: DataTypes.STRING
    }, {
      sequelize: connection,
    })
  }
}

module.exports = Students;