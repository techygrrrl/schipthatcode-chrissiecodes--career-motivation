const { MongoClient } = require("mongodb");
const { Environment } = require("./environment");

let db = null;

/**
 * Connect to the MongoDB database.
 */
async function connectDatabase() {
  const url = Environment.getMongoUrl();
  const client = new MongoClient(url);

  const dbName = "successStats";

  await client.connect();
  console.log("Connected successfully to server");

  db = client.db(dbName);
}

const getDatabase = () => db

module.exports = {
  connectDatabase,
  getDatabase,
};
