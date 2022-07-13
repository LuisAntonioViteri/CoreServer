
module.exports = (sequelize,Sequelize) => {
    const Stock_price = sequelize.define("buyed_stocks",{
        quantity:{
            type:Sequelize.INTEGER
        },
        date:{
            type:Sequelize.DATEONLY
        },
        total:{
            type:Sequelize.FLOAT
        },
        per:{
            type:Sequelize.FLOAT
        },
        short:{
            type:Sequelize.BOOLEAN,
            deflautValue: false
        }
    });
    return Stock_price;
}