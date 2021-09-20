const { Model, DataTypes } = require('sequelize');

class Admin extends Model {
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
    }, {
      sequelize: connection,
      tableName: "admin"
    })
  }
}

module.exports = Admin;