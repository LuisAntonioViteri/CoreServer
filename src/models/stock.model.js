module.exports =(sequelize,Sequelize) =>{
    const Stock = sequelize.define("stock",{
        name:{
            type:Sequelize.STRING(50)
        },
        code:{
            type:Sequelize.STRING(50)
        },
        date:{
            type:Sequelize.DATEONLY
        },
        price:{
            type:Sequelize.FLOAT
        }
    },{
        timestamps: false
    });
    return Stock;
}