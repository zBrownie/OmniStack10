const axios = require("axios");
const Dev = require("../models/Dev");
const parseArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return response.json({ devs });
  }
};
