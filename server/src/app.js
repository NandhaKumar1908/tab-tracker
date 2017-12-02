const express = require('express')
const bodyPrser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyPrser.json())
app.use(cors())

app.get('/status', (req, res) => {
  res.send({
    message: 'Hello World!'
  })
})

app.post('/register', (req, res) => {
  res.send({
    message: `Hello ${req.body.email}! Your user was registered! Have Fun!`
  })
})

app.listen(process.env.PORT || 8081)
