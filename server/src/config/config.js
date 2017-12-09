module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'tabtracker',
    user: process.env.DB_USER || 'tabtracker',
    password: process.env.DB_PASS || 'tabtracker',
    options: {
      dialect: process.env.dialect || 'sqlite',
      host: process.env.host || 'loclhost',
      storage: './tabtracker.sqlite'
    }
  }
}
