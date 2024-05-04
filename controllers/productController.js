const productModel = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(401).json({ Msg: err });
  }
};
const addProducts = async (req, res) => {
  const { name, quantity, price, status, category, image } = req.body;

  try {
    if (!name || !quantity || !price || !status || !category) {
      res.status(401).json({ Msg: "Fill all fields" });
    }

    //create product
    const newProduct = await productModel.create({
      name,
      quantity,
      price,
      status,
      category,
      image,
    });
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json({ Msg: err });
  }
};

const updateProducts = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);
    await productModel.findOneAndUpdate({ _id: itemId }, req.body, {
      new: true,
    });

    res.status(201).json("item Updated");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
    try {
        const { itemId } = req.body;
        console.log(itemId);
        await productModel.findOneAndDelete({ _id: itemId });
        res.status(200).json("item Deleted");
      } catch (error) {
        res.status(400).send(error);
        console.log(error);
      }
};
module.exports = {
  getProducts,
  addProducts,
  updateProducts,
  deleteProduct,
};
