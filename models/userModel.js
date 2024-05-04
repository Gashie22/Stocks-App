const express = require('express');
const mongoose = require('mongoose');

//first schema

const userSchema = mongoose.Schema({
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

const User = mongoose.model('User',userSchema); //setting the model name to User

module.exports = User;