require('dotenv').config();

module.exports = {
  dialect: 'mysql',
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  define: {
    timestamps: true,
    underscored: true,
  },
};
