const express = require("express");
const app = express();
// const cors = require("cors");

const { connectDatabase } = require("./utils/db");
const { Environment } = require("./utils/environment");

const port = Environment.getPort()
const nodeEnv = Environment.getNodeEnv()

if (nodeEnv === "development") {
  require("dotenv").config();
}

connectDatabase()
  .then(() => {
    console.log("connectDatabase() success");
  })
  .catch((error) => {
    console.error("connectDatabase() error:", error);
  });


/**
 * Set view engine
 */
app.set("view engine", "ejs");


/**
 * Use middleware
 */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());
app.use(require('./middleware/attach-database-middleware'))

/**
 * Routes
 */
// Root router -> /
app.use(require('./routes/stats-router'))

// Stories router -> /stories
app.use('/stories', require('./routes/stories-router'))


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


