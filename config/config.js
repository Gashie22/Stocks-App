const express = require('express');
const mongoose = require('mongoose');


//DB connection

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect (process.env.DB_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)

    }catch (err){
        console.log(err)
    }
}
module.exports =connectDB;