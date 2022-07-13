module.exports = (sequelize,Sequelize) =>{
    const Portafolio = sequelize.define('portafolio',{
        balance:{
            type: Sequelize.FLOAT
        }
    });
    return Portafolio;
}