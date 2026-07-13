import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

import ProductRouter from "./src/features/product/Product.routes.js";
import userrouter from "./src/features/user/user.route.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartrouter from "./src/features/cart/cartitems.routes.js";

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});

// Redirect to the trailing-slash URL
server.get("/api-docs", (req, res) => {
  res.redirect("/api-docs/");
});

// Swagger documentation
server.use(
  "/api-docs/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

server.use("/api/products", jwtAuth, ProductRouter);
server.use("/api/user", userrouter);
server.use("/api/cartItems", jwtAuth, cartrouter);

const PORT = process.env.PORT || 3100;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});