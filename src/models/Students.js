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
}

module.exports = Students;