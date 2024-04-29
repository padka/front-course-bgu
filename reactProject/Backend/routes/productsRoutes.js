const express = require('express');
const router = express.Router();
const productsModel = require('../models/productsModel'); // Ensure the products model is connected properly

// Route for fetching all products
router.get('/', async (req, res, next) => {
    try {
        const products = await productsModel.getProducts();
        res.json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching products', error: error.message });
    }
});

module.exports = router;
