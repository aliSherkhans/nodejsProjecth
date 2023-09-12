const express = require("express");
require("../database/db-config.js");
const productRouter = require("../router/productRouter.js");
const app = express();

app.use(express.json());

app.route("/").get((req, resp) => {
  resp.status(200).send("Welcome my shop");
});

app.use("/api/v1/product", productRouter);

module.exports = app;
