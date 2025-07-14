const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriesController');

router.get('/', controller.getAllCategories);
router.get('/:id', controller.getCategory);
router.post('/', controller.createCategory);
router.put('/:id', controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

module.exports = router;
