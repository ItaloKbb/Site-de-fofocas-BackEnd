const express = require('express');
const router = express.Router();
const prisma = require('./prisma');

// Criar uma nova postagem
router.post('/', async (req, res) => {
    const { titulo, conteudo, userId, categorias } = req.body;
    try {
      // Criar a postagem
      const novaPostagem = await prisma.postagem.create({
        data: {
          titulo,
          conteudo,
          autor: {
            connect: { id: userId }
          },
          Categorias: categorias && Array.isArray(categorias) ? {
            connect: categorias.map((categoriaId) => ({ id: categoriaId }))
          } : undefined
        },
      });
  
      res.json(novaPostagem);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar a postagem', details: error.message });
    }
});

// Listar todas as postagens com parâmetros de consulta
router.get('/', async (req, res) => {
  const { titulo, conteudo } = req.query;
  try {
    const where = {};
    if (titulo) {
      where.titulo = { contains: titulo, mode: 'insensitive' };
    }
    if (conteudo) {
      where.conteudo = { contains: conteudo, mode: 'insensitive' };
    }

    const postagens = await prisma.postagem.findMany({
      where,
      include: {
        autor: true,
        Categorias: true,
        Comentario: true,
      },
    });
    res.json(postagens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar as postagens', details: error.message });
  }
});

// Obter uma postagem pelo ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const postagem = await prisma.postagem.findUnique({
      where: { id: parseInt(id) },
      include: {
        autor: true,
        Categorias: true,
        Comentario: true,
      },
    });
    res.json(postagem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a postagem', details: error.message });
  }
});

// Atualizar uma postagem pelo ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo, categorias } = req.body;
  try {
    const postagemAtualizada = await prisma.postagem.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        conteudo,
        Categorias: {
          set: categorias.map((categoriaId) => ({ id: categoriaId }))
        }
      },
    });
    res.json(postagemAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a postagem', details: error.message });
  }
});

// Excluir uma postagem pelo ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.postagem.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Postagem excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir a postagem', details: error.message });
  }
});

module.exports = router;