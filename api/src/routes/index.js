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

//Obtener todos los juegos de la API

const getAllGames = async () => {
  console.log(page);
  let results = [];
  const pages = [1, 2, 3, 4, 5];
  const queries = [];
  pages.forEach((pageNumber) => {
    queries.push(axios.get(page + `&page=${pageNumber}`));
  });
  await Promise.all(queries)
    .then((queryResults) => {
      queryResults.forEach((queryResult) => {
        let response = queryResult.data;
        console.log(response.results.length);
        results.push(
          ...response.results.map((e) => ({
            id: e.id,
            name: e.name,
            image: e.background_image,
            genres: e.genres.map((r) => r.name),
            rating: e.rating,
          }))
        );
      });
    })
    .catch((error) => console.log(error));
  console.log(results.length);
  return results;
};

//Obtener info de DB (VideoJuegos Creados)

const getDbInfo = async () => {
  let dbInfo = await Videogame.findAll({
    include: [
      {
        model: Genre,
        as: "genres",
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });
  dbInfo = dbInfo.map((e) => ({
    ...e.dataValues,
    genres: e.genres.map((r) => r.name),
  }));
  return dbInfo;
};

//Juntar toda la info q traje de la api y la de db

const getAllVideogames = async () => {
  const apiInfo = await getAllGames();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  console.log(apiInfo.length);
  return infoTotal;
};

//Ruta del get

router.get("/videogames", async (req, res) => {
  const name = req.query.name;
  try {
    if (name) {
      let videogameName = await axios.get(page + `&search=${name}`);

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

//Ruta de Post (Crear Videojuegos)

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

//Ruta de ID (Mostrar videojuegos Detalle)

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
      const videogameId = await Videogame.findByPk(req.params.id, {
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      if (videogameId) {
        res.status(200).send(videogameId);
      } else {
        res.status(404).send("No se encontro el juego");
      }
    } else if (Number(id) !== NaN) {
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
