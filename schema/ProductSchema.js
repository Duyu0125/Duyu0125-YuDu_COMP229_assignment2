const mongoose = require ("mongoose");

// Define the product schema

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: String,
    published: Boolean
  },{collection:'product'}
  // if you don't add collection, the system will give a defalt name 
  //according to your content.
  );
  
  // create a collection
  module.exports = mongoose.model('Product',productSchema);