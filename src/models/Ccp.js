const { Model, DataTypes } = require('sequelize');

class CCPs extends Model {
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
    })
  }
  static associate(models) {
    this.hasMany(models.Teacher, { foreignKey: 'teacherId', as: 'ccp' });
  }
}

module.exports = CCPs;