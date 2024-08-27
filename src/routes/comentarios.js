const express = require('express');
const comentarioController = require('../controllers/comentarioControllers');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, comentarioController.createComentario);
router.get('/', authenticateToken, comentarioController.getComentarios);
router.put('/:id', authenticateToken, comentarioController.updateComentario);
router.delete('/:id', authenticateToken, comentarioController.deleteComentario);

module.exports = router;