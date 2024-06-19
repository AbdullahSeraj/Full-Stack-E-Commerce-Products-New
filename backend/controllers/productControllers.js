const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find();

  if (!products || products.length === 0) {
    return res.status(400).json({ message: "No data to show" });
  }

  res.json(products);
};

const uploadProduct = async (req, res) => {
  const { title, description, brand, category, images, price, selling } =
    req.body;

  if (
    !title ||
    !description ||
    !brand ||
    !category ||
    images.length === 0 ||
    !price ||
    !selling
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const product = await Product.create({
    title,
    description,
    brand,
    category,
    images,
    price,
    selling,
  });

  res.json(product);
};

const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { title, description, brand, category, images, price, selling } =
    req.body;

  if (
    !title &&
    !description &&
    !brand &&
    !category &&
    images.length === 0 &&
    !price &&
    !selling
  ) {
    return res.status(400).json({ message: "All fields are empty" });
  }

  const payload = {
    ...(title && { title: title }),
    ...(description && { description: description }),
    ...(brand && { brand: brand }),
    ...(category && { category: category }),
    ...(images && { images: images }),
    ...(price && { price: price }),
    ...(selling && { selling: selling }),
  };

  const foundProduct = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
  });

  res.json(foundProduct);
  try {
  } catch (error) {
    return res.status(404).json({ message: "Server Error" });
  }
};

const getProduct = async (req, res) => {
  const productId = req.params.productId;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(400).json({ message: "Not found product" });
  }

  res.json(product);
};

const deleteProduct = async (req, res) => {
  const id = req.params.productId;

  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    return res.status(404).json({ msg: "Note not found" });
  }

  res.status(200).json(product);
};

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    const productByCategory = [];

    for (const category of categories) {
      const product = await Product.findOne({ category });
      if (product) {
        productByCategory.push(product);
      }
    }

    res.json(productByCategory);
  } catch (error) {
    return res.status(404).json({ msg: "Server Error" });
  }
};

const getProductsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Product.find({ category: category });
    res.json(products);
  } catch (error) {
    return res.status(404).json({ msg: "Server Error" });
  }
};

const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;

    const regex = new RegExp(query, "i", "g");

    const products = await Product.find({
      $or: [{ title: regex }, { category: regex }, { description: regex }],
    });

    res.json(products);
  } catch (error) {
    res.status(404).json({ message: "Server Error" });
  }
};

const filterProductController = async (req, res) => {
  const { categoryList } = req.body;

  const products = await Product.find({
    category: { $in: categoryList },
  });

  res.json(products);
};

module.exports = {
  uploadProduct,
  getAllProducts,
  updateProduct,
  getProduct,
  deleteProduct,
  getCategories,
  getProductsByCategory,
  searchProducts,
  filterProductController,
};
