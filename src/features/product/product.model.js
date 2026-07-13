import UserModel from "../user/user.model.js";

export default class ProductModel {
  constructor(
    id,
    name,
    desc,
    imageUrl,
    category,
    price,
    size
  ) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.size = size;
    this.rating = [];
  }

  // Get all products
  static getAll() {
    return products;
  }

  // Get one product by ID
  static getById(id) {
    return products.find(
      (product) => product.id === Number(id)
    );
  }

  // Add a new product
  static addProduct(productData) {
    const newId =
      products.length === 0
        ? 1
        : Math.max(
            ...products.map((product) => product.id)
          ) + 1;

    const sizes = Array.isArray(productData.size)
      ? productData.size
      : String(productData.size)
          .split(",")
          .map((size) => size.trim())
          .filter((size) => size !== "");

    const newProduct = new ProductModel(
      newId,
      productData.name,
      productData.desc,
      productData.imageUrl,
      productData.category,
      Number(productData.price),
      sizes
    );

    products.push(newProduct);

    return newProduct;
  }

  // Update a product
  static updateProduct(id, updates) {
    const product = this.getById(id);

    if (!product) {
      return null;
    }

    const allowedFields = [
      "name",
      "desc",
      "imageUrl",
      "category",
      "price",
      "size"
    ];

    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        if (
          field === "size" &&
          !Array.isArray(updates[field])
        ) {
          product[field] = String(updates[field])
            .split(",")
            .map((size) => size.trim())
            .filter((size) => size !== "");
        } else {
          product[field] = updates[field];
        }
      }
    });

    return product;
  }

  // Delete a product
  static deleteProduct(id) {
    const productIndex = products.findIndex(
      (product) => product.id === Number(id)
    );

    if (productIndex === -1) {
      return null;
    }

    const deletedProducts = products.splice(
      productIndex,
      1
    );

    return deletedProducts[0];
  }

  // Filter products
  static filter(minPrice, maxPrice, category) {
    const minimumPrice =
      minPrice === undefined || minPrice === ""
        ? null
        : Number(minPrice);

    const maximumPrice =
      maxPrice === undefined || maxPrice === ""
        ? null
        : Number(maxPrice);

    const normalizedCategory = category
      ? category.trim().toLowerCase()
      : null;

    return products.filter((product) => {
      const matchesMinPrice =
        minimumPrice === null ||
        (!Number.isNaN(minimumPrice) &&
          product.price >= minimumPrice);

      const matchesMaxPrice =
        maximumPrice === null ||
        (!Number.isNaN(maximumPrice) &&
          product.price <= maximumPrice);

      const matchesCategory =
        normalizedCategory === null ||
        product.category.toLowerCase() ===
          normalizedCategory;

      return (
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesCategory
      );
    });
  }

  // Add or update product rating
  static rateProduct(userId, productId, rating) {
    if (!userId) {
      return {
        error: "User ID is required",
        status: 401
      };
    }

    const user = UserModel.getAll().find(
      (currentUser) => currentUser.id == userId
    );

    if (!user) {
      return {
        error: "User not found",
        status: 404
      };
    }

    const product = this.getById(productId);

    if (!product) {
      return {
        error: "Product not found",
        status: 404
      };
    }

    const numericRating = Number(rating);

    if (
      Number.isNaN(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return {
        error: "Rating must be between 1 and 5",
        status: 400
      };
    }

    const existingRatingIndex =
      product.rating.findIndex(
        (item) => item.userId == userId
      );

    const ratingData = {
      userId,
      rating: numericRating
    };

    if (existingRatingIndex >= 0) {
      // Update existing rating
      product.rating[existingRatingIndex] =
        ratingData;
    } else {
      // Add new rating
      product.rating.push(ratingData);
    }

    return {
      product
    };
  }
}

let products = [
  new ProductModel(
    1,
    "Nike Air Max",
    "Comfortable running shoes with breathable mesh.",
    "/uploads/nike-airmax.jpg",
    "Category1",
    5999,
    ["7", "8", "9", "10"]
  ),

  new ProductModel(
    2,
    "Levi's Denim Jacket",
    "Classic blue denim jacket for casual wear.",
    "/uploads/denim-jacket.jpg",
    "Category2",
    3499,
    ["S", "M", "L", "XL"]
  ),

  new ProductModel(
    3,
    "Apple AirPods Pro",
    "Wireless earbuds with active noise cancellation.",
    "/uploads/airpods.jpg",
    "Category3",
    24999,
    ["Standard"]
  ),

  new ProductModel(
    4,
    "Samsung Galaxy Watch",
    "Smartwatch with AMOLED display and fitness tracking.",
    "/uploads/galaxy-watch.jpg",
    "Category4",
    18999,
    ["40mm", "44mm"]
  ),

  new ProductModel(
    5,
    "Wildcraft Backpack",
    "Water-resistant backpack for travel and college.",
    "/uploads/backpack.jpg",
    "Category5",
    2199,
    ["20L", "30L", "40L"]
  ),

  new ProductModel(
    6,
    "Puma Sports T-Shirt",
    "Dry-fit sports t-shirt for everyday workouts.",
    "/uploads/puma-tshirt.jpg",
    "Category2",
    1299,
    ["S", "M", "L", "XL", "XXL"]
  )
];