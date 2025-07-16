const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemsController'); // this line

const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', controller.getAllItems);
router.get('/:id', controller.getItem);

router.post('/', isAuthenticated, controller.createItem);
router.put('/:id', isAuthenticated, controller.updateItem);
router.delete('/:id', isAuthenticated, controller.deleteItem);

module.exports = router;
