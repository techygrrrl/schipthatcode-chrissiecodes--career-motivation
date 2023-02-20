const { getDatabase } = require("../utils/db");

const attachDatabaseMiddleware = (request, response, next) => {
  const db = getDatabase()
  
  response.locals.db = db

  next()
}

module.exports = attachDatabaseMiddleware
