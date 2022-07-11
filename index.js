const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({
    description: "A sample express-application as a part of an assignment",
    name: "no-name",
    version: "0.0.0",
  });
});

app.get("/hello", (req, res) => {
  const name = req.query["name"];
  const resName = name ? name : "Manish";
  res.send({ name: resName });
});

app.listen(process.env.PORT || 4000, () => console.log("Application Started"));
