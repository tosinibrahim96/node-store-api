require("dotenv").config();

const express = require("express");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
require("express-async-errors");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    console.log("Connected to the DB successfully");

    app.listen(PORT, console.log(`Server listening on PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
