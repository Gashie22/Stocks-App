const express = require('express');
const connectDB = require('./config/config')
const dummyData = require('./utils/dummy');
const dotenv = require ('dotenv');
const productModel = require('./models/productModel');

//configurations
dotenv.config()
connectDB()

//sedder function to add data in the DB

const importData = async ()=>{
    try{
        await productModel.deleteMany();
        const dataItems = await productModel.insertMany({
            name: "Coffee Mug",
            quantity: 5,
            price: 12,
            status: "out of stock",
            category: "Kitchenware",
            image: "https://example.com/coffee-mug.jpg",
          })
          console.log(dataItems)
          const dataItems2 = await productModel.insertMany(
            {
                name: "Red T-Shirt",
                quantity: 10,
                price: 25,
                status: "i",
                category: "Clothing",
                image: "https://example.com/red-t-shirt.jpg",
              })
        console.log(dataItems2)
        
        console.log("All items added")


    }catch(err){
        console.log(err)
    }
}

importData()