const Cart = require("../models/Cart");

const getProdcutsFromCart = async (req, res) => {
  const userId = req.user;

  const cart = await Cart.find({ userId: userId });

  if (!cart.length) {
    return res.status(401).json({ message: "Not found products from cart" });
  }

  res.json(cart);
};

const addToCart = async (req, res) => {
  const userId = req.user;
  const { product, quantity } = req.body;

  if (!product) {
    return res.status(401).json({ message: "Plase enter product id" });
  }

  const foundProduct = await Cart.findOne({ userId, product });

  if (foundProduct) {
    const updatedProduct = await Cart.findOneAndUpdate(
      { userId, product },
      { quantity: foundProduct.quantity + 1 },
      { new: true }
    );

    return res.json(updatedProduct);
  }

  const cart = await Cart.create({
    userId,
    product,
    quantity,
  });

  res.json(cart);
};

const deleteProductFromCart = async (req, res) => {
  const userId = req.user;
  const productId = req.params.id;

  const foundProduct = await Cart.findOne({
    userId,
    ["product._id"]: productId,
  });
  if (!foundProduct) {
    return res.status(401).json({ message: "Not found this product" });
  }

  const product = await Cart.findOneAndDelete({
    userId,
    ["product._id"]: productId,
  });

  res.json(product);
};

const clearCart = async (req, res) => {
  const userId = req.user;

  const cart = await Cart.deleteMany({ userId });
  if (!cart.length) {
    return res.status(401).json({ message: "No product for deleting" });
  }

  res.json(cart);
};

const updateProductFromCart = async (req, res) => {
  const userId = req.user;
  const productId = req.params.id;
  const { quantity } = req.body;

  try {
    const foundProduct = await Cart.findOne({
      userId,
      ["product._id"]: productId,
    });

    if (!foundProduct) {
      return res.status(401).json({ message: "No product for deleting" });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId, ["product._id"]: productId },
      { quantity: quantity },
      { new: true }
    );

    res.json(cart);
  } catch (error) {
    return res.status(404).json({ message: "Error Server" });
  }
};

const getLengthFromCart = async (req, res) => {
  const userId = req.user;
  let cartLength = 0;

  const cart = await Cart.find({ userId });

  cart.map((item) => {
    cartLength += item.quantity;
  });

  res.json({ cartLength: cartLength });
};

const getTotalFromCart = async (req, res) => {
  const userId = req.user;
  let total = 0;

  const cart = await Cart.find({ userId });

  cart.map((item) => {
    total += item.product.selling * item.quantity;
  });

  res.json({ total: total });
};

module.exports = {
  getProdcutsFromCart,
  addToCart,
  deleteProductFromCart,
  clearCart,
  updateProductFromCart,
  deleteProductFromCart,
  getLengthFromCart,
  getTotalFromCart,
};
