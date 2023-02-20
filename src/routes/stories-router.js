const { Router } = require("express");

const router = new Router();


router.get('/', (request, response) => {
  const { db } = response.locals;

  db.collection("stories")
    .find({})
    .toArray()
    .then((data) => {
      response.render("stories.ejs", { info: data });
    })
    .catch((error) => console.error(error));
})

router.post("/add", (request, response) => {
  const { db } = response.locals;

  const {
    newStory,
    industry,
    transTime,
    yearsExp,
    intNumber,
    techEducation,
    lastTitle,
    currentTitle
  } = request.body

  db.collection("stories")
    .insertOne({
      newStory,
      industry,
      transTime,
      yearsExp,
      intNumber,
      techEducation,
      lastTitle,
      currentTitle,
    })
    .then((result) => {
      console.log("Story Added");
      
      response.redirect("/stories");
    })
    .catch((error) => {
      console.error(error)
      response.render("error.ejs", {});
    });
});

module.exports = router
