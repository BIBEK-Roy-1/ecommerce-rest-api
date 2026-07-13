import ProductModel from "./product.model.js";

export default class ProductController {
  // GET /api/products
  getAllProducts(req, res) {
    const products = ProductModel.getAll();

    return res.status(200).json(products);
  }

  // GET /api/products/:id
  getOneProduct(req, res) {
    const productId = req.params.id;
    const product = ProductModel.getById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json(product);
  }

  // POST /api/products
  addProduct(req, res) {
    const {
      name,
      desc,
      imageUrl,
      category,
      price,
      size
    } = req.body;

    if (
      !name ||
      !desc ||
      !category ||
      price === undefined ||
      !size
    ) {
      return res.status(400).json({
        message:
          "Name, description, category, price and size are required"
      });
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        message: "Price must be a valid non-negative number"
      });
    }

    const finalImageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : imageUrl || null;

    const newProduct = ProductModel.addProduct({
      name,
      desc,
      imageUrl: finalImageUrl,
      category,
      price: numericPrice,
      size
    });

    return res.status(201).json({
      message: "Product added successfully",
      product: newProduct
    });
  }

  // PUT /api/products/:id
  updateProduct(req, res) {
    const productId = req.params.id;
    const updates = { ...req.body };

    if (updates.price !== undefined) {
      const numericPrice = Number(updates.price);

      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({
          message: "Price must be a valid non-negative number"
        });
      }

      updates.price = numericPrice;
    }

    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = ProductModel.updateProduct(
      productId,
      updates
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });
  }

  // DELETE /api/products/:id
  deleteProduct(req, res) {
    const productId = req.params.id;

    const deletedProduct =
      ProductModel.deleteProduct(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct
    });
  }

  // GET /api/products/filter
  filterProducts(req, res) {
    const {
      minPrice,
      maxPrice,
      MaxPrice,
      category
    } = req.query;

    const products = ProductModel.filter(
      minPrice,
      maxPrice || MaxPrice,
      category
    );

    return res.status(200).json(products);
  }

  // POST /api/products/rate
  rateProduct(req, res) {
    // User ID comes from JWT middleware
    const userId = req.userId;

    const productId =
      req.body.productId || req.query.productId;

    const rating =
      req.body.rating || req.query.rating;

    const result = ProductModel.rateProduct(
      userId,
      productId,
      rating
    );

    if (result.error) {
      return res.status(result.status || 400).json({
        message: result.error
      });
    }

    return res.status(200).json({
      message: "Rating added successfully",
      product: result.product
    });
  }
}