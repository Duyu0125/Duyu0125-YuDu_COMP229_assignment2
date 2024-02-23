const express = require('express');
const router = express.Router();
const ProductModel = require('../schema/ProductSchema');

// GET /products - Retrieve products with optional filters
router.get('/', async (req, res) => {
  try {
    const { name, published } = req.query;
    const filters = {};

    if (name) {
      // Case-insensitive search for products containing the provided name
      filters.name = { $regex: name, $options: 'i' };
    }

    if (published) {
      // Filter products by published status
      filters.published = published === 'true';
    }

    const products = await ProductModel.find(filters);
    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  // GET /products/:id - Retrieve a product by ID
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error retrieving product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  module.exports = router;

  // POST /products

  router.post('/', async (req, res) => {
    try {
      const { name, price, description, quantity,category,published} = req.body;
      const product = new ProductModel({ name, price, description, quantity,category,published});
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // PUT /products/:id - Update a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description,quantity,category,published } = req.body;
    const product = await ProductModel.findByIdAndUpdate(id, { name, price, description,quantity,category,published}, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// DELETE /products/:id - Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /products - Delete all products
router.delete('/', async (req, res) => {
  try {
    await ProductModel.deleteMany();
    res.json({ message: 'All products deleted successfully' });
  } catch (error) {
    console.error('Error deleting products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


