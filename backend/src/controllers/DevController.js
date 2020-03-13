const axios = require("axios");
const Dev = require("../models/Dev");
const parseArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    //RETORNA TODOS DEV CADASTRADOS
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    try {
      const { github_username, techs, latitude, longitude } = request.body;

      //PROCURA SE DEV JA EXISTE
      let dev = await Dev.findOne({ github_username });

      //SE DEV NAO EXISTE NO BANCO DE DADOS, ELE CADASTRA PEGANDO DADOS DA API GITHUB
      if (!dev) {
        const resp = await axios.get(
          `https://api.github.com/users/${github_username}`
        );

        const { name = login, avatar_url, bio } = resp.data;

        const techsArray = parseArray(techs);

        const location = {
          type: "Point",
          coordinates: [longitude, latitude]
        };

        dev = await Dev.create({
          name,
          github_username,
          bio,
          avatar_url,
          techs: techsArray,
          location
        });
      }

      return response.json(dev);
    } catch (e) {
      console.log(e.toString());
    }
  }
};
