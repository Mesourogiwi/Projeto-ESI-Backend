const { Model, DataTypes } = require('sequelize');

class Ccp extends Model {
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
      tableName: "ccp"
    })
  }
  static associate(models) {
    this.hasMany(models.Teacher, { foreignKey: 'ccpId', as: 'teacher' });
  }
}

module.exports = Ccp;