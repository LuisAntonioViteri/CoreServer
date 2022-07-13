
const db = require("../models");
//const config = require("../config/auth.config");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;
const Role = db.role;
//var jwt = require("jsonwebtoken");
//var bcrypt = require("bcryptjs");
//const { usuarios } = require("../models");
//const { user } = require("pg/lib/defaults");

exports.create = (req, res)=>{
  //Validate request
  if(!req.body.nombre){
      res.status(400).send({
          message: "Content can not be empty!"
      });
      return;
  }

  //Create usuario

  const usuario = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      email: req.body.email,
      username: "",
      password: ""
  };

  //Save usuario in the db

  Usuario.create(usuario)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
          message:
              err.message || "Some error occurred while creating the Usuario."
          });
      });

};
exports.findAll = (req, res)=>{
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;
  Usuario.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving usuarios."
      });
    });

};

exports.findOne = (req, res)=>{
    const id = req.params.id;
  Usuario.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Usuario with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Usuario with id=" + id
      });
    });

};

exports.update = (req, res)=>{
    const id = req.params.id;
  Usuario.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuario was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Usuario with id=${id}. Maybe Usuario was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Usuario with id=" + id
      });
    });

};

exports.delete = (req, res)=>{
    const id = req.params.id;
  Usuario.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuario was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Usuario with id=${id}. Maybe Usuario was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Usuario with id=" + id
      });
    });
};

exports.deleteAll = (req, res)=>{
    Usuario.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Usuarios were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Usuarios."
          });
        });

};
