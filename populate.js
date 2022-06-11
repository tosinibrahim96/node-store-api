require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    Product.deleteMany();
    Product.create(jsonProducts);
    console.log("Success!!1");
    exit(0);
  } catch (error) {
    console.log({ error });
    exit(1);
  }
};

start();
