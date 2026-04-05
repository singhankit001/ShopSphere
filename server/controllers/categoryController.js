const Category = require('../models/Category');
const mongoose = require('mongoose');
const { categories: fallbackCategories } = require('../data/fallbackData');

// @desc    Get all categories
// @route   GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB unavailable, using fallback data.');
      return res.json(fallbackCategories);
    }
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create category (Admin only)
// @route   POST /api/categories
exports.createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const slug = name.toLowerCase().split(' ').join('-');
    const category = await Category.create({ name, slug, description, image });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
