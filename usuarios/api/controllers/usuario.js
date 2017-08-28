'use strict';
    // incluimos nuestra base de datos
    var db = require('../../config/db')();
    // exportamos todas nuestras funciones
    module.exports = {getAll, save, getOne, update, remove};

    //GET /listar todos los usuarios
    function getAll(req, res, next) {
      res.json({ usuarios: db.find()});
    }
    //POST /guardar un nuevo registro
    function save(req, res, next) {
        res.json({success: db.save(req.body), description: "Usuario Agregado!"});
    }
    //GET /usuarios/{id} operationId
    function getOne(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contiene los parametros
        var usuarios = db.find(id);
        if(usuarios) {
            res.json(usuarios);
        }else {
            res.status(204).send();
        }       
    }
    //PUT /usuarios/{id} operationId
    function update(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contiene los parametros
        var usuarios = req.body;
        if(db.update(id, usuarios)){
            res.json({success: 1, description: "Usuario Actualizado!"});
        }else{
            res.status(204).send();
        }

    }
    //DELETE /usuarios/{id} operationId
    function remove(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contiene los parametros
        if(db.remove(id)){
            res.json({success: 1, description: "Usuario Eliminado!"});
        }else{
            res.status(204).send();
        }

    }