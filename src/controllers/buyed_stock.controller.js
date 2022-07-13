
const db = require("../models");
const Buyed = db.buyed_stock;
const Stocks = db.stock;
const Op = db.Sequelize.Op;


exports.createBuy = async (req,res) =>{
    const {quantity,date,short,portafolioId,stockId} = req.body;
    
    try{
        
        const stock = await Stocks.findOne({
            where:{id:stockId}
        });
        const stockNow = await Stocks.findOne({
            where:{code:stock.code}
        });
        if(short===false){
            var per = stockNow.price-stock.price;
        }else{
            var per = -stockNow.price+stock.price;
        };
        const buyedStock = {
            quantity:quantity,
            date:date,
            total: quantity * stock.price,
            per: per,
            short:short,
            portafolioId:portafolioId,
            stockId:stockId
        };

        
        await Buyed.create(buyedStock);
        res.send({
            message: "Stock was created succesfully"
        })

    }catch (error){
        return res.status(500).send({
            message: error.message
            });
    }

}

exports.getStockBuyed = async (req,res)=>{
    try{
        const buyed = await Buyed.findAll();
        res.send(buyed)
    }catch (error){
        return res.status(500).send({
            message:
                error.message
            });
    }
}


exports.deleteSellBuyId = async (req,res)=>{
    try{
        const stock = req.body;
        await Buyed.destroy({
            where: { 
                portafolioId:stock.portafolioId,
                stockId: stock.stockId,
            }
        }).then({
            message:`Stocks ${stock.stockId} delted successfully`
        });
    }catch(error){
        return res.status(500).send({
            message:
                error.message
            });
    }
}

exports.updateStockBuyId = async (req,res)=>{
    const stock = req.body;
    
    Buyed.update(stock, {
        where: { 
            portafolioId:stock.portafolioId,
            stockId: stock.stockId
        }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Portafolio was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update stock with ${stock.stockId}. Maybe Portafolio was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating buyed stock with id=" + stock.stockId
          });
        });
    
}

exports.getStockBuyByID= async (req,res) =>{
    try{
        const stock = req.body;
        const buyed = await Buyed.findOne({
            where: { 
                portafolioId:stock.portafolioId,
                stockId: stock.stockId,
            }
        });
        res.send(buyed);
    }catch(error){
        return res.status(500).send({
            message:
                error.message
            });
    }
}
exports.getStockBuyByPortafolioId= async (req,res) =>{
    try{
        const stock = req.body;
        const buyed = await Buyed.findOne({
            where: { 
                portafolioId:stock.portafolioId
            }
        });
        res.send(buyed);
    }catch(error){
        return res.send({
            message:
                error.message
            });
    }
}

exports.updateStocksPer = async (req,res) =>{
    const {portafolioId,stockId} = req.body;
    
    try{
        const stock = await Stocks.findOne({
            where:{id:stockId},
            
        });
        const buyed = await Buyed.findOne({
            where:{stockId:stockId,portafolioId:portafolioId}
        })
        const stockNow = await Stocks.findOne({
            where:{code:stock.code}
        });
        if(buyed.short===false){
            var per = stockNow.price-stock.price;
        }else{
            var per = -stockNow.price+stock.price;
        };
        const buyedStock = {
            total: buyed.quantity * stock.price,
            per: per
        };
        
        Buyed.update(buyedStock, {
            where: { 
                portafolioId:portafolioId,
                stockId: stockId
            }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Portafolio was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update stock with vale. Maybe Portafolio was not found or req.body is empty!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating buyed stock value"
              });
            });


    }catch (error){
        return res.status(500).send({
            message: error.message
            });
    }

}
 


exports.updateBuyedStocks=async(req,res)=>{
    try{

        
        
        foreach(element => {
            
            const stock =  Stocks.findOne({
                where:{id:element.stockId}
            });
            const stockNow = Stocks.findOne({
                where:{code:stock.code}
            });
            if(element.short){
                var per = stockNow.price-stock.price;
            }else{
                var per = -stockNow.price+stock.price;
            };
            var total = per * element.quantity;
            Buyed.update({per:per,total:total}, {
                where: { 
                    portafolioId:element.portafolioId,
                    stockId: element.stockId,
                }
              })
                .then(num => {
                  if (num == 1) {
                    res.send({
                      message: "Portafolio was updated successfully."
                    });
                  } else {
                    res.send({
                      message: `Cannot update portafolio with id=${id}. Maybe Portafolio was not found or req.body is empty!`
                    });
                  }
                })
                .catch(err => {
                  res.status(500).send({
                    message: "Error updating portafolio with id=" + stock.stockId
                  });
                });

        });
        res.send({message:"terminado"});

    }catch (error){
        return res.status(500).send({
            message:
                error.message
            });
    }

}

exports.getBuysRangoFechas=async(req, res)=>{
    const {dateinf, datesup} = req.body;

    const raw = await Buyed.findAll({
        where: {
            date: {
                [Op.between]:[new Date(dateinf),new Date(datesup)]
            }
        }
    });
    data = JSON.stringify(raw);
    filterbuyedstocks = JSON.parse(data);

    const stocksraw =  await Stocks.findAll({
        where: {
            date: {
                [Op.between]:[new Date(dateinf),new Date(datesup)]
            }
        }
    });

    data = JSON.stringify(stocksraw);
    filterstocks = JSON.parse(data);
    

    filterstocks.sort(((a,b)=>b.date-a.date));



    laststockvalue=filterstocks[filterstocks.length-1];
    


   /* filterstocks.map(element=>{
        console.log(element.id);

    });*/
    

    let earnings=0;
    /*
    filterbuyedstocks.forEach(element => {
        filterstocks.forEach(element2 => {
            
            console.log(element.stockId==element2.id);
            
        });
    });*/

    filterbuyedstocks.map(elements=>{
        filterstocks.map(stocks=>{
            //console.log(stocks.id,elements.id);
            if(stocks.id===elements.stockId){
                earnings= earnings+(laststockvalue.price+stocks.price);
            }
        })
    });
    const respuesta = {
        filterbuyedstocks,
        filterstocks,
        earnings
    };
    res.send(respuesta);








}







