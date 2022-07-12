import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

const app = express();

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB connection successful! Registering get resources endpoint.."
    );

    app.get("/resources", async (req, res) => {
      const allProducts = await Product.find({});
      res.send(allProducts);
    });

    console.log("endpoint registered!!");
  })
  .catch((err) => console.error(err));

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
