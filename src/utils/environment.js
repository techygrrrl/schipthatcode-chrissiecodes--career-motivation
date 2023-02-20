const Environment = {
  getMongoUrl() {
    const value = process.env.DB_STRING;
    if (!value) {
      throw new Error('DB_STRING required')
    }

    return value
  },

  getPort() {
    return process.env.PORT || 3000
  },

  getNodeEnv() {
    return process.env.NODE_ENV
  },
}

module.exports = {
  Environment,
}
