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

// Buscar usuários por nome ou id
router.get('/', async (req, res) => {
  const { nome, id } = req.query;
  try {
    let usuarios;
    if (id) {
      usuarios = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
    } else if (nome) {
      usuarios = await prisma.user.findMany({
        where: {
          nome: {
            contains: nome,
            mode: 'insensitive',
          },
        },
      });
    } else {
      return res.status(400).json({ error: 'Por favor, forneça um nome ou id para a busca' });
    }
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o usuário', details: error.message });
  }
});

module.exports = router;