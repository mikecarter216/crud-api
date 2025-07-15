const Item = require('../models/item');

// GET all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET one item by ID
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST a new item
exports.createItem = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;

    // Simple validation
    if (!name || typeof price !== 'number') {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const item = new Item({ name, description, price, quantity, category });
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT (update) item
exports.updateItem = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price, quantity, category },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE item
exports.deleteItem = async (req, res) => {
  try {
    const result = await Item.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Item not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
