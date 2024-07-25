const express = require('express');
const router = express.Router();
const prisma = require('./prisma');

// Criar uma nova categoria
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const novaCategoria = await prisma.categoria.create({
      data: {
        name,
      },
    });
    res.json(novaCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a categoria', details: error.message });
  }
});

module.exports = router;