const Software = require('../models/Software');
const Category = require('../models/Category');

// @desc    Get all software
// @route   GET /api/software
// @access  Public
exports.getAllSoftware = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludeFields.forEach(el => delete queryObj[el]);

    // Build query
    let query = Software.find();

    // Search functionality
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = query.or([
        { name: searchRegex },
        { description: searchRegex }
      ]);
    }

    // Category filter
    if (queryObj.category) {
      query = query.find({ category: queryObj.category });
    }

    // Populate category
    query = query.populate('category', 'name slug');

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Get total before applying pagination
    const total = await Software.countDocuments(query.getQuery());

    // Apply pagination
    query = query.skip(startIndex).limit(limit);

    // Execute query
    const software = await query;

    res.status(200).json({
      success: true,
      count: software.length,
      total,
      data: software,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error('Error in getAllSoftware:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Error retrieving software list'
    });
  }
};

// @desc    Get single software
// @route   GET /api/software/:id
// @access  Public
exports.getSoftware = async (req, res) => {
  try {
    const software = await Software.findById(req.params.id).populate('category', 'name slug');

    if (!software) {
      return res.status(404).json({
        success: false,
        message: 'Software not found'
      });
    }

    res.status(200).json({
      success: true,
      data: software
    });
  } catch (err) {
    console.error('Error in getSoftware:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Error retrieving software'
    });
  }
};

// @desc    Create new software
// @route   POST /api/software
// @access  Private
exports.createSoftware = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const software = await Software.create(req.body);
    
    // Populate category before sending response
    await software.populate('category', 'name slug');

    res.status(201).json({
      success: true,
      data: software
    });
  } catch (err) {
    console.error('Error in createSoftware:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Error creating software'
    });
  }
};

// @desc    Update software
// @route   PUT /api/software/:id
// @access  Private
exports.updateSoftware = async (req, res) => {
  try {
    let software = await Software.findById(req.params.id);

    if (!software) {
      return res.status(404).json({
        success: false,
        message: 'Software not found'
      });
    }

    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
    }

    software = await Software.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('category', 'name slug');

    res.status(200).json({
      success: true,
      data: software
    });
  } catch (err) {
    console.error('Error in updateSoftware:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Error updating software'
    });
  }
};

// @desc    Delete software
// @route   DELETE /api/software/:id
// @access  Private
exports.deleteSoftware = async (req, res) => {
  try {
    const software = await Software.findById(req.params.id);

    if (!software) {
      return res.status(404).json({
        success: false,
        message: 'Software not found'
      });
    }

    await software.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error('Error in deleteSoftware:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Error deleting software'
    });
  }
}; 