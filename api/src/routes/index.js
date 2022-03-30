const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//Traigo Axios
const axios = require("axios");
//Traigo Router
const router = Router();
//Traigo Tablas de la db
const { Videogame, Genre, videogame_genre } = require("../db");
//Traigo Operadores de Sequelize
const { Op } = require("sequelize");

//Memoria de APIKEY
//API_KEY: ee73b8eb452e4dc493ed18922f1060cb
//Memoria de direccion de la API con APIKEY GET ALL GAMES
//https://api.rawg.io/api/games?key=ee73b8eb452e4dc493ed18922f1060cb&dates=2019-09-01,2019-09-30&platforms=18,1,7

let API_KEY = "?key=ee73b8eb452e4dc493ed18922f1060cb";
let page = "https://api.rawg.io/api/games";

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
