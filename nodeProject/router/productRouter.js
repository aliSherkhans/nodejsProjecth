const express = require("express");
const productControll = require("../controller/productController.js");
const Authentication = require("../middelware/productCheck.js");
const productRouter = express.Router();

productRouter.route("/").get(productControll.getProduct);
productRouter.route("/limit").get(productControll.getProductByLimit);
productRouter.route("/create").post(productControll.createProduct);

productRouter.route("/:price").get(productControll.getProductByPrice);

module.exports = productRouter;
