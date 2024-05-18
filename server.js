const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
// const mongoose= require('mongoose');
const connectDB =require('./config/config.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');  
//importing routes
const userRoute=require('./routes/userRoute.js'); 
// const getProducts = require ('./controllers/productController.js')
//import middleware
const errorHandler = require('./middleware/errorMiddleware.js');

 
  


//importing middleware routes

//const errorHandler = require('./middleware/errorHandler.js');

//initialize express
const app = express();

//middleware for JSON parser

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(bodyParser.json())
app.use(morgan("dev"))

//cors policy
//initial commit changed
app.use(cors({ 
    credentials: true,
    origin: "http://localhost:3000"}));
//userRoute 
dotenv.config(); 
//db config
connectDB()
app.use('/api',require('./routes/productRouter.js'));//url = /users/register
app.use('/api',require('./routes/userRoute.js'));//url = /users/register
app.use('/api',require('./routes/clientsRouter.js'));//url = /users/register



//erorHandler middleware
app.use(errorHandler)

//start server

const PORT = 5000 || process.env.PORT 

//connect to DB

    app.listen(PORT, ()=>{
        console.log("DB connected")
        console.log("App connected on Port: " + PORT)
    }) 


 