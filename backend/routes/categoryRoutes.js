const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getCategories)
  .post(protect, createCategory);

router.route('/:id')
  .delete(protect, deleteCategory);

module.exports = router; 