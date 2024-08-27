const express = require('express');
const userController = require('../controllers/userControllers');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

//Post do login que retorna o TOKEN jwt para uso no client
router.post('/login', userController.login);

//Realiza o cadastro de usuario
router.post('/', userController.createUser);

//retorna um usuario especifico ou todos eles
router.get('/:id?', authenticateToken, userController.getUser);

//Atualiza um usuario de acordo com seu ID
router.put('/:id', authenticateToken, userController.updateUser);

module.exports = router;