const AuthenticationController = require('./controllers/AuthenticaationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)
  app.get('/songs',
    SongsController.index)
  app.post('/songs',
    SongsController.post)
}
