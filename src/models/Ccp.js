const { Model, DataTypes } = require('sequelize');

class ccps extends Model {
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
      teacher_id: DataTypes.INTEGER
    }, {
      sequelize: connection,
    })
  }
  static associate(models) {
    this.belongsTo(models.Teacher, { foreignKey: 'teacher_id'});
  }
}

module.exports = ccps;