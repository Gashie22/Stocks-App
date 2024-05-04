
const express = require('express');
const mongoose=require('mongoose');

const ProductSchema = mongoose.Schema({
    //properties
    name:{
        type: String,
        required:[true, 'Enter product name']
    },
    quantity:{
        type: String,
        required:[true, 'Enter quantity'],
    },
    price:{
        type: String,
        required:[true, 'Enter price'],
    },
    status:{
        type: String,
        required:[true, 'Enter status']
    },
    category : {
        type: String,
        required:[true, 'Enter category']
    },
    image : {
        type: String,
        required:[false, 'Enter image']
    }
},{timestamps:true}) //timestamps is for automatic

const Product = mongoose.model('Product',ProductSchema); //setting the model name to Product

module.exports = Product;
