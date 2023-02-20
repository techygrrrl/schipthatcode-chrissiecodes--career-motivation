const { Router } = require("express");

const router = new Router();

router.get("/", (request, response) => {
  const { db } = response.locals;

  db.collection("stats")
    .find({})
    .toArray()
    .then((data) => {
      response.render("index.ejs", { info: data || [] });
    })
    .catch((error) => {
      console.error(error)
      response.render("error.ejs", {});
    });
})

router.post("/stats/add", (request, response) => {
  const { db } = response.locals;

  db.collection("stats")
    .insertOne({
      prevTitle: request.body.prevTitle,
      prevIncome: request.body.prevIncome.replace(/[$,.]/g, ""),
      techTitle: request.body.techTitle,
      techIncome: request.body.techIncome.replace(/[$,.]/g, ""),
    })
    .then((result) => {
      console.log("Stat Added");
      response.redirect("/");
    })
    .catch((error) => {
      console.error(error)
      response.render("error.ejs", {});
    });
});

module.exports = router
