const { Op } = require("sequelize");
const _ = require("lodash");
const { Moive, Music, Sentence } = require("./classic");
class Art {
  constructor(art_id, type) {
    this.art_id = art_id;
    this.type = type;
  }
  async getDetail(uid) {
    const Favor = require("@models/favor.js");
    const id = this.art_id;
    const type = this.type;
    const art = await Art.getData(id, type);
    if (!art) {
      throw new global.errs.NotFound();
    }
    const likeLatest = await Favor.userLikeIt(id, type, uid);
    return {
      likeLatest,
      art
    };
  }
  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: []
    };
    const arts = [];
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id);
    }
    for (let key in artInfoObj) {
      const ids = artInfoObj[key];
      if (ids.length === 0) continue;
      arts.push(await Art._getListByType(artInfoObj[key], key * 1));
    }
    return _.flatten(arts);
  }
  static async _getListByType(ids, type, useScope = true) {
    const scope = useScope ? "bh" : null;
    const finder = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    };
    switch (type) {
      case 100:
        return await Moive.scope(scope).findOne(finder);
        break;
      case 200:
        return await Music.scope(scope).findOne(finder);
        break;
      case 300:
        return await Sentence.scope(scope).findOne(finder);
        break;
      case 400:
        return await Moive.findOne(finder);
        break;
      default:
        break;
    }
  }
  static async getData(art_id, type, useScope = true) {
    const scope = useScope ? "bh" : null;
    switch (type) {
      case 100:
        return await Moive.scope(scope).findOne({
          where: {
            id: art_id
          }
        });
        break;
      case 200:
        return await Music.scope(scope).findOne({
          where: {
            id: art_id
          }
        });
        break;
      case 300:
        return await Sentence.scope(scope).findOne({
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
