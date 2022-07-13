const db = require("../models");
const Stocks = db.stock;
const Op = db.Sequelize.Op;


exports.createStocks = async (req,res) =>{
    const {name,code,date,price} = req.body;
    try{
        await Stocks.create({
            name,
            code,
            date,
            price
        });
        res.send({
            message: "Stock was created succesfully"
        })

    }catch (error){
        return res.status(500).send({
            message:"Error creating portafolio"
            });
    }

}

exports.getStocks = async (req,res)=>{
    try{
        const stocks = await Stocks.findAll();
        res.send(stocks)
    }catch (error){
        return res.status(500).send({
            message:
                error.message
            });
    }
}
exports.getStocksUser = async (req,res)=>{
    try{
        const stocks = await Stocks.findAll();
        stocks=stocks.map(element => {
            newelement = {
                name:element.name,
                code:element.code,
                date:element.date,
                price:element.price
            }
            element=newelement;
        })
        res.send(stocks)
    }catch (error){
        return res.status(500).send({
            message:
                error.message
            });
    }
}

exports.deleteStock = async (req,res)=>{
    try{
        const {id} = req.params;
        await Stocks.destroy({
            where:{
                id
            }
        }).then(
            res.send({
                message: `Stock ${id} was deleted successfully`
            })
        );
    }catch(error){
        return res.status(500).send({
            message:
                error.message
            });
    }
}

exports.updateStock= (req, res)=>{
    const id = req.params.id;
  Stocks.update(req.body, {
    where: { id: id }
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
        message: "Error updating portafolio with id=" + id
      });
    });
}

exports.getStockByID= async (req,res) =>{
    try{
        const {id} = req.params;
        const stock = await Stocks.findAll({where:{id:id}});
        res.send(stock);
    }catch(error){
        return res.status(500).send({
            message:
                error.message
            });
    }
}
exports.getStocksRangoFechas=async(req, res)=>{
    const {dateinf, datesup} = req.body;
    const raw = await Stocks.findAll({
        where: {
            date: {
                [Op.between]:[new Date(dateinf),new Date(datesup)]
            }
        }
    });
    res.send(raw);
}


