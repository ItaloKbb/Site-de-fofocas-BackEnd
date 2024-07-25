const express = require('express');
const router = express.Router();
const prisma = require('./prisma');

// Criar um novo comentário
router.post('/', async (req, res) => {
  const { texto, userId, postagemId } = req.body;
  try {
    const novoComentario = await prisma.comentario.create({
      data: {
        texto,
        autor: {
          connect: { id: userId }
        },
        ComentariosPostagem: {
          connect: { id: postagemId }
        }
      },
    });
    res.json(novoComentario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o comentário', details: error.message });
  }
});

module.exports = router;