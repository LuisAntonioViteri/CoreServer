//const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize)=>{
    const Usuario = sequelize.define("usuario",{
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        username:{
            type:Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });
    return Usuario;
}