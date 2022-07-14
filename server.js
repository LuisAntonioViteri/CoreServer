const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/models");
const cors = require("cors");
const app = express();

const Role = db.role;
var corsOptions = {
  origin: process.env.CORSPORT
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "App Express.js active" });
});
//sync db with models, if a table is changed a new table with modifications is created
db.sequelize.sync({force:false}).then(()=>{
  console.log('Drop and Resync Db');
  initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
// set port, listen for requests
require("./src/routes/auth.routes.js")(app);
require("./src/routes/routes.js")(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port', process.env.PORT ||3000);
});


