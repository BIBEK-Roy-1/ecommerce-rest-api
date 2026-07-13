//manage rutes to ProductController

import ProductController from "./product.controller.js";


//1. import express
import express from "express";

//2.initilized express getrouter
const ProductsRouter=express.Router();

const productcontroller=new ProductController();


//all the paths to controller method
ProductsRouter.get("/",productcontroller.getAllProducts);
ProductsRouter.post("/",productcontroller.addProduct);

ProductsRouter.get("/filter",productcontroller.filterProducts)
ProductsRouter.get('/:id',productcontroller.getOneProduct);

ProductsRouter.post('/rate',productcontroller.rateProduct);


export default ProductsRouter;

