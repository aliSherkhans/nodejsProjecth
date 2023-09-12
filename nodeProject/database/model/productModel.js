const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  createAt: {
    type: Date,
    default: Date.now,
  },
  contetity: Number,
});

module.exports = mongoose.model("genralShop", productSchema, "genralShop");
