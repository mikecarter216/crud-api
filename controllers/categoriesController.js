const Category = require('../models/category');

// GET all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET one
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
};

// POST
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });

    const newCat = new Category(req.body);
    await newCat.save();
    res.status(201).json(newCat);
  } catch (err) {
    res.status(500).json({ message: 'Create error' });
  }
};

// PUT
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });

    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update error' });
  }
};

// DELETE
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete error' });
  }
};
