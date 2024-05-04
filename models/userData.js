const express = require('express');
const mongoose = require('mongoose');

//first schema

const DataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
  
      userId: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      verified: {
        type: Boolean,
      },
    },
    
    { timestamp: true }


)

const UserData = mongoose.model('UserData',DataSchema); //setting the model name to User

module.exports = UserData;