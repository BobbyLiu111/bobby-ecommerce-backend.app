const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

const cors = require("cors");
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://bobby-ecommerce-frontend.vercel.app",
    credentials: true,
  })
);

const uploadImage = require("./src/utils/uploadImage");

const authRoutes = require("./src/users/user.route");
const productRoutes = require("./src/products/product.route");
const reviewRoutes = require("./src/reviews/reviews.route");
const orderRoutes = require("./src/orders/orders.route");
const stateRoutes = require("./src/stats/stats.route");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", stateRoutes);

main()
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.get("/", (req, res) => {
  res.send("Bobby E-commerce Server is running");
});

app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("环境变量检查:");
  console.log("JWT exists:", !!process.env.JWT_SECRET_KEY); // 这个能获取到
  console.log("Stripe exists:", !!process.env.STRIPE_SECRET_KEY); // 这个获取不到
  console.log(
    "变量名称:",
    Object.keys(process.env).filter((key) => key.includes("STRIPE"))
  );
});
