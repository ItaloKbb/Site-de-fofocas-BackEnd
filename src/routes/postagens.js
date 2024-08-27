const express = require('express');
const postagemController = require('../controllers/postagemControllers');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

//Insere uma nova postagem no banco de dados
router.post('/', authenticateToken, postagemController.createPostagem);

//Retorna uma postagem de acordo com seu ID, titulo ou bio, caso nenhum parametro ela retorna todos.
router.get('/', authenticateToken, postagemController.getPostagens);

//Atualiza uma postagem de acordo com seu ID.
router.put('/:id', authenticateToken, postagemController.updatePostagem);

//Deleta uma postagem através de seu ID (Faltar ser implementado a validação de ROLE)
router.delete('/:id', authenticateToken, postagemController.deletePostagem);

module.exports = router;