const express = require('express');
const router = express.Router();
const prisma = require('./prisma');

// Criar um novo usuário
router.post('/', async (req, res) => {
  const { email, nome, bio, role } = req.body;
  try {
    const novoUsuario = await prisma.user.create({
      data: {
        email,
        nome,
        bio,
        role,
      },
    });
    res.json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o usuário', details: error.message });
  }
});

module.exports = router;