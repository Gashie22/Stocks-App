const clientsModel = require("../models/clientsModel");

const getClients = async (req, res) => {
    try {
        const bills = await clientsModel.find();
        res.send(bills);
      } catch (error) {
        console.log(error);
      }
};


const addClients = async (req, res) => {


try {
    const newBill = new clientsModel(req.body);
    await newBill.save();
    res.send("Bill Created Successfully!");
  } catch (error) {
    res.send("something went wrong");
    console.log(error);
  }
};

//   const { clientsName, clientsNumber, paymentMode } = req.body;

//   try {
//     if (!clientsName || !clientsNumber || !paymentMode) { 
//       res.send("Add all fields")
//     }

//     //create product
//     const newClient = await clientsModel.create({
//       clientsName,
//       clientsNumber,
//       totalPrice,
//       tax,
//       paymentMode,
//     });
//     res.send("Sucessfully Added");
//   } catch (err) {
//     res.send("something went wrong");
//   }
// };

const updateClients = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);
    await clientsModel.findOneAndUpdate({ _id: itemId }, req.body, {
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
    await clientsModel.findOneAndDelete({ _id: itemId });
    res.status(200).json("item Deleted");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
module.exports = {
  getClients,
  addClients,
  updateClients,
};
