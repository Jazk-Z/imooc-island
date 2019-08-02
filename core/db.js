const Sequelize = require("sequelize");
const {
  database: { dbName, host, port, user, password }
} = require("../config/config");
const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  timezone: "+08:00",
  defined: {
    timestamps: true
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
// sequelize.sync();
// sequelize.sync({
//   force: true 会删表和数据
// });
module.exports = {
  db: sequelize
};
