const { Moive, Music, Sentence } = require("./classic");

class Art {
  static async getData(art_id, type) {
    switch (type) {
      case 100:
        return await Moive.findOne({
          where: {
            id: art_id
          }
        });
        break;
      case 200:
        return await Music.findOne({
          where: {
            id: art_id
          }
        });
        break;
      case 300:
        return await Sentence.findOne({
          where: {
            id: art_id
          }
        });
        break;
      case 400:
        return await Moive.findOne({
          where: {
            id: art_id
          }
        });
        break;
      default:
        break;
    }
  }
}

module.exports = Art;
