require('dotenv').config({
  path: process.env.NODE_ENV.trim() === 'test' ? '.env.test' : '.env'
});

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
  define: {
    timestamps: true,
    underscored: true,
  },
};
