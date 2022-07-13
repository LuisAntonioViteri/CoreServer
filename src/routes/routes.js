const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const usuarios = require("../controllers/usuario.controller");
const portafolios = require("../controllers/portafolio.controller");
const buyed = require("../controllers/buyed_stock.controller");
const stock = require("../controllers/stock.controller");
const { route } = require("express/lib/application");
module.exports = app => {
   
    var router = require("express").Router();
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
   //-----------USER ROUTES----------------[authJwt.verifyToken]
    // Create a new Usuario
    router.post("/usuarios",usuarios.create);
    // Retrieve all usuarios
    //router.get("/signup",usuarios.signup);
    router.get("/usuarios", usuarios.findAll);
    // Retrieve a single USUARIO with id
    router.get("/usuarios/:id", usuarios.findOne);
    // Update a USUARIO with id
    router.put("/usuarios/:id",  usuarios.update);
    // Delete a USUARIO with id
    router.delete("/usuarios/:id", usuarios.delete);
    // Create a new USUARIO
    router.delete("/", usuarios.deleteAll);
    app.use('/api/', router);
//--------PORTAFOLIO ROUTES--------------

    router.post("/portafolio",portafolios.createPortafolios);
    router.get("/portafolio",portafolios.getPortafolios);
    router.put("/portafolio/:id",portafolios.updatePortafolios);
    router.get("/portafolio/:id",portafolios.getPortafolioByID);
    router.delete("/portafolio/:id",portafolios.deletePortafolios);

//--------BUYED_STOCK ROUTES------------

    router.post("/buyed",buyed.createBuy);
    router.get("/buyed",buyed.getStockBuyed);
    router.put("/buyed", buyed.updateStockBuyId);
    router.get("/buyed/one", buyed.getStockBuyByID);
    router.delete("/buyed/deleteId", buyed.deleteSellBuyId);
    router.get("/buyed/search/:id", buyed.getStockBuyByPortafolioId);
    router.get("/buyed/rango",buyed.getBuysRangoFechas);

//--------ADMIN UPDATING BUYS------------
    router.put("/buyed/update",buyed.updateStocksPer);

//--------STOCKS ROUTES-----------

    router.post("/stocks",stock.createStocks);
    router.get("/stocks",stock.getStocks);
    router.put("/stocks/search/:id",stock.updateStock); 
    router.get("/stocks/search/:id",stock.getStockByID);
    router.delete("/stocks/search/:id",stock.deleteStock);
    router.get("/stocks/user",stock.getStocksUser);
    router.get("/stocks/rango",stock.getStocksRangoFechas);
  };