const {
  Histories,
  Song
} = require('../models')

const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const {userId} = req.query
      const histories1 = await Histories.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Song
          }
        ]
      }).map(histories => histories.toJSON())
        .map(histories => _.extend(
          {},
          histories.Song,
          histories))
      res.send(histories1)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the history' || err
      })
    }
  },
  async post (req, res) {
    try {
      const {songId, userId} = req.body.params
      const histories = await Histories.create({
        UserId: userId,
        SongId: songId
      })
      res.send(histories)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the history' || err
      })
    }
  }
}
