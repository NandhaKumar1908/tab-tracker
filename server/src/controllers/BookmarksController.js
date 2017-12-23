const {Bookmark} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const {songId, userId} = req.query
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the bookmark' || err
      })
    }
  },
  async post (req, res) {
    try {
      const {songId, userId} = req.body.params
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      console.log('bookmark', bookmark)
      if (bookmark) {
        return res.status(400).send({
          error: 'You have already set this as Bookmark'
        })
      }
      const newbookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newbookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the bookmark' || err
      })
    }
  },
  async delete (req, res) {
    try {
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findById(bookmarkId)
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete the bookmark' || err
      })
    }
  }
}
