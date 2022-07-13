const db = require("../models");
const Portafolio = db.portafolio;



exports.createPortafolios = async (req,res) =>{
    //const {balance, usuarioId} = req.body;
    try{
        await Portafolio.create(req.body);
        
        res.send({
            message: "Portafolio was created succesfully"
        })

    }catch (error){
        return res.status(500).send({
            message:
                error.message
            });
    }

}

exports.getPortafolios = async (req,res)=>{
    try{
        const portafolio = await Portafolio.findAll();
        res.send(portafolio)
    }catch (error){
        return res.status(500).send({
            message:
                error.message
            });
    }
}

exports.deletePortafolios = async (req,res)=>{
    try{
        const {id} = req.params;
        await Portafolio.destroy({
            where:{
                id:id
            }
        });
        res.send({
            message: `Portafolio ${id} was deleted succesfully`
        })
    }catch(error){
        return res.status(500).send({
            message:
                error.message
            });
    }
}
/*
exports.updatePortafolios = async (req,res)=>{
    try{
        const{id} = req.params;
        //const{balance, usuarioId} = req.body;
        const portafolio = await Portafolio.findAll({where:{id:id}});
        portafolio.balance = req.body.balance;
        portafolio.usuarioId = req.body.usuarioId;
        
        await portafolio.save;
        res.send(portafolio);
        /*res.send({
            message: "Portafolio was updated successfully."
          });
    }catch(error){
        return res.status(500).send({
            message:
                error.message
            });
    }
}*/
exports.updatePortafolios = (req, res)=>{
    const id = req.params.id;
  Portafolio.update(req.body, {
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

};
exports.getPortafolioByID = async (req,res) =>{
    try{
        const{id} = req.params;
        const portafolio = await Portafolio.findAll({
            where:{id:id}
        });
        if(!portafolio){
            res.send({
                message: `Portafolio with id = ${id} not found`
            });
        }else{
            res.send(portafolio);
        }
    }catch(error){
        return res.status(500).send({
            message:
                error.message
            });
    }
}






