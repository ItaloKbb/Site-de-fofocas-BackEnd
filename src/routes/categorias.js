const express = require('express');
const categoriaController = require('../controllers/categoriaControllers');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, categoriaController.createCategoria);
router.get('/', authenticateToken, categoriaController.getCategorias);
router.put('/:id', authenticateToken, categoriaController.updateCategoria);
router.delete('/:id', authenticateToken, categoriaController.deleteCategoria);

module.exports = router;