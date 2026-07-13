import express from "express";
import swagger from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };





import ProductRouter from "./src/features/product/Product.routes.js";
import bodyParser from "body-parser";
import userrouter from "./src/features/user/user.route.js";
import basicAuthorizer from "./src/middlewares/basicauth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartrouter from "./src/features/cart/cartitems.routes.js";
import apiDocs from './swagger.json' with { type: 'json' };


const server=express();





server.get("/",(req,res)=>{
    res.send("welcome to Ecommerce APIs")
})
server.use(bodyParser.json());


//for all the rquest related to product ,redirect to product routes.
// server.use("/api/products",basicAuthorizer,ProductRouter);
server.use("/api/products",jwtAuth,ProductRouter);
server.use("/api/user",userrouter);
server.use("/api/cartItems",jwtAuth,cartrouter);

server.use('/api-docs',swagger.serve,swagger.setup(apiDocs));

server.use(
  "/api-docs",
  swagger.serve,
  swagger.setup(swaggerDocument)
);


const PORT = process.env.PORT || 3100;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});