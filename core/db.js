const { Sequelize, Model } = require("sequelize");
const {
  database: { dbName, host, port, user, password }
} = require("../config/config");
const { unset, clone, isArray } = require("lodash");
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
Model.prototype.toJSON = function() {
  let data = this.dataValues;
  data = clone(this.dataValues);
  unset(data, "updated_at");
  unset(data, "created_at");
  unset(data, "deleted_at");
  if (isArray(this.exclude)) {
    this.exclude.forEach(v => {
      unset(data, v);
    });
  }
  return data;
};
module.exports = {
  db: sequelize
};
