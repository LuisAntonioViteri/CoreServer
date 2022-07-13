//const dbConfig = require("../config/dbconfig.js");
const Sequelize = require("sequelize");// calling the library
/*const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: '0',
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});*/


//--------For Heroku Postgres--------------
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//-----------------------------------------

//-------- DB sequilize instances and models call -------
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
db.portafolio = require("./portafolio.model.js")(sequelize,Sequelize);
db.stock = require("./stock.model.js")(sequelize,Sequelize);
db.buyed_stock = require("./buyed_stock.js")(sequelize,Sequelize);
db.role = require("./role.model.js")(sequelize,Sequelize);

//----- Defining relationships ------
db.role.belongsToMany(db.usuarios,{
  through: "user_roles",
  foreingKey: "roleId",
  otherKey:"userId"
});
db.usuarios.belongsToMany(db.role,{
  through: "user_roles",
  foreingKey: "userId",
  otherKey:"roleId"
});
db.usuarios.hasOne(db.portafolio,{
  foreingKey: "userId"
});
db.portafolio.belongsTo(db.usuarios);
db.portafolio.belongsToMany(db.stock,{
  through:"buyed_stocks",
  foreingKey:"portafolioId",
  otherKey:"stockId"
});
db.stock.belongsToMany(db.portafolio,{
  through:"buyed_stocks",
  foreingKey:"stockId",
  otherKey:"portafolioId"
});


db.ROLES = ["user", "admin", "moderator"];

/*db.sequelize.sync({force: true}).then(()=>{
    console.log("Drop and re-sync db.");
});*/
module.exports = db;