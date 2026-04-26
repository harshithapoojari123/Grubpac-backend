const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,   // MUST NOT BE EMPTY
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: "mysql",
    logging: false,
  }
);