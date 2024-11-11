const { Sequelize, Model, DataTypes } = require("@sequelize/core");
const { SqliteDialect } = require("@sequelize/sqlite3");
const path = require('path');

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: path.join(__dirname, 'database.sqlite'),
})

class UserModel extends Model { }
UserModel.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: sequelize,
  modelName: 'users',
  freezeTableName: true,
  timestamps: true,
})

async function conntectDb() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.');
    sequelize.sync({ alter: true })
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

module.exports = { sequelize, conntectDb, UserModel }
