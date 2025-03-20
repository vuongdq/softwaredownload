const express = require('express');
const router = express.Router();
const {
  getAllSoftware,
  getSoftware,
  createSoftware,
  updateSoftware,
  deleteSoftware
} = require('../controllers/softwareController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getAllSoftware)
  .post(protect, createSoftware);

router.route('/:id')
  .get(getSoftware)
  .put(protect, updateSoftware)
  .delete(protect, deleteSoftware);

module.exports = router; 