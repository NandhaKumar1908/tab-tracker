const {User} = require('../models')

module.exports = {
  status(re, res){
    res.send({
      message: 'Hello World!'
    })
  },
 async register(req, res){
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch(err) {
      res.status(400).send({
        error: 'This e-mail id is alread in use'
      })
    }
  }
}
