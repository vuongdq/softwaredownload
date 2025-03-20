const mongoose = require('mongoose');

const softwareSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide software name'],
    trim: true,
    maxlength: [100, 'Software name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide software description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  fileUrl: {
    type: String,
    required: [true, 'Please provide software file URL']
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide software category']
  },
  version: {
    type: String,
    required: [true, 'Please provide software version']
  },
  size: {
    type: String,
    required: [true, 'Please provide software size']
  },
  os: {
    type: [String],
    required: [true, 'Please provide supported operating systems'],
    enum: ['Windows', 'macOS', 'Linux']
  },
  license: {
    type: String,
    required: [true, 'Please provide software license'],
    enum: ['Free', 'Trial', 'Paid', 'Open Source']
  },
  thumbnail: {
    type: String,
    default: 'default-thumbnail.png'
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Middleware to update category's software count
softwareSchema.pre('save', async function(next) {
  if (this.isNew) {
    const Category = this.model('Category');
    await Category.findByIdAndUpdate(this.category, { $inc: { softwareCount: 1 } });
  }
  next();
});

softwareSchema.pre('remove', async function(next) {
  const Category = this.model('Category');
  await Category.findByIdAndUpdate(this.category, { $inc: { softwareCount: -1 } });
  next();
});

module.exports = mongoose.model('Software', softwareSchema); 