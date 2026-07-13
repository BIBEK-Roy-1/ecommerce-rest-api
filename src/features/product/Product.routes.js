import express from "express";
import ProductController from "./product.controller.js";

const ProductRouter = express.Router();

const productController =
  new ProductController();

// GET /api/products
ProductRouter.get(
  "/",
  productController.getAllProducts
);

// GET /api/products/filter
// This must stay before /:id
ProductRouter.get(
  "/filter",
  productController.filterProducts
);

// POST /api/products/rate
// This must also stay before /:id
ProductRouter.post(
  "/rate",
  productController.rateProduct
);

// POST /api/products
ProductRouter.post(
  "/",
  productController.addProduct
);

// GET /api/products/:id
ProductRouter.get(
  "/:id",
  productController.getOneProduct
);

// PUT /api/products/:id
ProductRouter.put(
  "/:id",
  productController.updateProduct
);

// DELETE /api/products/:id
ProductRouter.delete(
  "/:id",
  productController.deleteProduct
);

export default ProductRouter;