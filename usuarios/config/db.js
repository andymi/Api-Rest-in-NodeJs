'use strict';

//Incluimos crypto para generar el id del usuario
var crypto = require('crypto');

module.exports = function() {
    return {
        usuariosList : [],
        /*
         * guardar un usuario dentro de "db".
         */
        save(usuarios) {
            usuarios.id = crypto.randomBytes(20).toString('hex'); 
            this.usuariosList.push(usuarios);
            return 1;           
        },
        /*
         * Retorna un usuario determinado si el id esta definido o todos los usuarios si el id no está definido
         */
        find(id) {
            if(id) {
                return this.usuariosList.find(element => {
                        return element.id === id;
                    }); 
            }else {
                return this.usuariosList;
            }
        },
        /*
         * Eliminamos un usuario con el id obtenido.
         */
        remove(id) {
            var found = 0;
            this.usuariosList = this.usuariosList.filter(element => {
                    if(element.id === id) {
                        found = 1;
                    }else {
                        return element.id !== id;
                    }
                });
            return found;           
        },
        /*
         * Actualizamos un usuario con el id obtenido
         */
        update(id, usuarios) {
            var usuariosIndex = this.usuariosList.findIndex(element => {
                return element.id === id;
            });
            if(usuariosIndex !== -1) {
                this.usuariosList[usuariosIndex].user = usuarios.user;
                this.usuariosList[usuariosIndex].pass = usuarios.pass;
                return 1;
            }else {
                return 0;
            }
        }  
    }
};  