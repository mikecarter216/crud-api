const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemsController');

router.get('/', controller.getAllItems);
router.get('/:id', controller.getItem);
router.post('/', controller.createItem);
router.put('/:id', controller.updateItem);
router.delete('/:id', controller.deleteItem);

module.exports = router;