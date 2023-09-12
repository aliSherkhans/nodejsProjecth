const productModel = require("../database/model/productModel.js");

const getProduct = async (req, resp) => {
  const sorting = req.query.sort;
  const sortFormat = sorting.replace(",", " ");
  const productDetails = filtrAndOperator(req);
  try {
    if (productDetails) {
      const product = await productModel
        .find(productDetails)
        .sort(sortFormat || "price");
      resp
        .status(200)
        .send({ status: true, message: "received data", product });
    } else {
      resp.status(404).send({ status: false, message: "Data Not Found" });
    }
  } catch (error) {
    resp.status(500).send({ status: false, Error: error.message });
  }
};

const getProductByLimit = async (req, resp) => {
  const limit = req.params.limit || 3;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  try {
    if (req.query.page) {
      const dataCount = await productModel.countDocuments();
      if (skip > dataCount) {
        throw new Error("Page Not Found");
      }
    }
    const product = await productModel.find().skip(skip).limit(limit);
    resp.status(200).send({ status: true, message: "received data", product });
  } catch (error) {
    resp.status(500).send({ status: false, Error: error.message });
  }
};

const getProductByPrice = async (req, resp) => {
  const productPrice = req.params.price;
  try {
    const product = await productModel.find({ price: productPrice });
    resp.status(200).send({ status: true, message: "received data", product });
  } catch (error) {
    resp.status(500).send({ status: false, Error: error.message });
  }
};

const createProduct = async (req, resp) => {
  const productDetails = req.body;
  try {
    const product = new productModel(productDetails);
    const saveProduct = await product.save();
    resp
      .status(201)
      .send({ Status: true, message: "Create product", saveProduct });
  } catch (error) {
    resp.status(500).send({ status: false, Error: error.message });
  }
};

function filtrAndOperator(req) {
  const productRequest = { ...req.query };
  if (JSON.stringify(productRequest) !== "{}") {
    const queryObj = [...Object.keys(productModel.schema.obj), "_id"]; // mongodb
    const reqsetObj = [...Object.keys(productRequest)];
    reqsetObj.forEach((key) => {
      if (!queryObj.includes(key)) {
        delete productRequest[key];
      }
    });
  }

  const reqsetObjToStr = JSON.stringify(productRequest);
  if (reqsetObjToStr !== "{}") {
    const createOperator = reqsetObjToStr.replace(
      /\b(gt|lt|gte|lte|eq)\b/g,
      (match) => `$${match}`
    );
    const requestStrToObj = JSON.parse(createOperator);
    return requestStrToObj;
  }
}

module.exports = {
  getProduct,
  createProduct,
  getProductByPrice,
  getProductByLimit,
};
