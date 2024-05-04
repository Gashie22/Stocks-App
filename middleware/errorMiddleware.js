//custom eror handling
const express = require('express');

const errorHandler =(err,req,res,next) => {
    // //returning a specific error
    // const statusCode = res.statusCode ? res.statusCode :500
    // res.status(statusCode)

    // //respons msg in json format
    // res.json({msg : err.message ,
    // stack:err.stack //stack is the error location
    // })
}

module.exports = errorHandler;