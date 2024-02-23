// setting up a express server

const express = require('express');
const cors = require('cors');
const app=express();
const port=8080;

// Middleware: cors and express

 app.use(cors());
 app.use(express.json());

 // Enable CORS middleware
app.use((req, res, next) => {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Allow all HTTP methods
  res.setHeader('Access-Control-Allow-Methods', '*');

  // Allow all headers
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Continue to the next middleware
  next();
});


app.get('/',(req,res)=>{
  res.json({message:'Welcome to DressStore application.'})
})

app.listen(port,()=>{
  console.log('Server listening at http://localhost: ${port}');
})

//

//hjklkh
// setting up a mongdb
const mongoose = require ("mongoose");
const username="duyu0125";
const password="EiHwgodhlcanNsJ0";
const dbname="Marketplace";

let mongodbUriString = 'mongodb+srv://'+username+':'+password+'@cluster0.devvhdq.mongodb.net/'+dbname+
'?retryWrites=true&w=majority';

// connect to MongoDB
async function connectDB () {
      try {
        console.log(mongodbUriString)
        await mongoose.connect(mongodbUriString, { useNewUrlParser: true });
        console.log("Connected to the database");
      } catch (error) {
        console.error("Database connection error:", error);
      }
    }
connectDB()

// API(ProdctController.js)
const productController=require('./controller/ProductController')
app.use('/products', productController);





