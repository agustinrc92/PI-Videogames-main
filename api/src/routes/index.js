const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//Traigo Axios
const axios = require("axios");
//Traigo Router
const router = Router();
//Traigo Tablas de la db
const { Videogame, Genre, videogame_genre } = require("../db");
//Traigo ApiKey
const { API_KEY } = process.env;
//Traigo Operadores de Sequelize
const { Op } = require("sequelize");

let page = `https://api.rawg.io/api/games?key=${API_KEY}`;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Obtener todos los juegos

const getAllGames = async () => {
  try {
    const apiUrl = await axios.get(page);

    const apiInfo = await apiUrl.data.results.map((game) => {
      console.log(game.platforms);
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres.map((genre) => {
          return genre.name;
        }),
      };
    });
    return apiInfo;
  } catch (error) {
    console.log(error);
  }
};

//Obtener info de DB

const getDbInfo = async () => {
  const dbInfo = await Videogame.findAll({
    include: [
      {
        model: Genre,
        as: "genres",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });
  return dbInfo;
};

//Juntar toda la info q traje y la de db

const getAllVideogames = async () => {
  const apiInfo = await getAllGames();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

//Ruta del get

router.get("/videogames", async (req, res) => {
  const name = req.query.name;
  try {
    if (name) {
      let videogameName = await axios.get(page + `&search=${name}`);
      console.log(videogameName);
      videogameName = videogameName.data.results.map((game) => {
        console.log(game.platforms);
        return {
          id: game.id,
          name: game.name,
          image: game.background_image,
          genres: game.genres.map((genre) => {
            return genre.name;
          }),
        };
      });
      videogameName.length
        ? res.status(200).send(videogameName.slice(0, 15))
        : res.status(404).send("No se encontraron resultados");
    } else {
      let videogames = await getAllVideogames();
      res.status(200).send(videogames);
    }
  } catch (error) {
    console.log(error);
  }
});

//Ruta de Genres

router.get("/genres", async (req, res) => {
  try {
    let genres = await Genre.findAll();
    if (!genres.length) {
      const genresApi = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      genres = await genresApi.data.results.map((el) => ({
        name: el.name,
      }));
      await Genre.bulkCreate(genres);
      genres = await Genre.findAll();
    }

    res.send(genres);
  } catch (error) {
    console.log(error);
  }
});

//Ruta de Post

router.post("/videogame", async (req, res) => {
  try {
    let { name, description, image, released, rating, platforms, genres } =
      req.body;

    let videogameCreated = await Videogame.create({
      name,
      description,
      image,
      released,
      rating,
      platforms,
    });
    let genresDb = await Genre.findAll({
      where: { name: genres },
    });
    await videogameCreated.addGenres(genresDb);
    res.send("Videogame creado con exito");
  } catch (error) {
    console.log(error);
  }
});

//Ruta de ID

function isUUid(id) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id
  );
}

router.get("/videogame/:id", async (req, res) => {
  try {
    let { id } = req.params;
    console.log(typeof id);
    if (isUUid(id)) {
      console.log("basedeDatos");
      const videogameId = await Videogame.findByPk(req.params.id);
      if (videogameId) {
        res.status(200).send(videogameId);
      } else {
        res.status(404).send("No se encontro el juego");
      }
    } else if (Number(id) !== NaN) {
      console.log("API");
      let videogameId = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      videogameId = videogameId.data;
      videogameId = {
        id: videogameId.id,
        name: videogameId.name,
        image: videogameId.background_image,
        rating: videogameId.rating,
        released: videogameId.released,
        description: videogameId.description,
        genres: videogameId.genres.map((genre) => {
          return genre.name;
        }),
        platforms: videogameId.platforms.map((platform) => {
          return platform.platform.name;
        }),
      };

      res.send(videogameId);
    } else {
      res.status(404).send("ID Invalido");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
