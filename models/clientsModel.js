
const express = require('express');
const mongoose=require('mongoose');

const ClientsSchema = mongoose.Schema({
    //properties
    clientsName:{
        type: String,
        required:[true, 'Enter product name']
    },
    clientsNumber:{
        type: String,
        required:[true, 'Enter quantity'],
    },
    totalAmount:{
        type: String,
        required:[false, 'Enter price'],
    },
    tax:{
        type: String,
        required:[false, 'Enter status']
    },
    paymentMode : {
        type: String,
        required:[true, 'Enter category']
    },
    cartItems :{
        type: Array,
        required : true
    }
}
,{timestamps:true}) //timestamps is for automatic

const Clients = mongoose.model('Client',ClientsSchema); //setting the model name to Product

module.exports = Clients;
