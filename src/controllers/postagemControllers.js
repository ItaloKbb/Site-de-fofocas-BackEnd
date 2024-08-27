const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const createPostagem = async (req, res) => {
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
};

const getPostagens = async (req, res) => {
    const { id, titulo, conteudo } = req.query;
    try {
        let RetornoPostagens;
        
        if (titulo) {
            RetornoPostagens = await prisma.postagem.findMany({
                where: { titulo: { contains: titulo, mode: 'insensitive' } },
                include: {
                    autor: true,
                    categorias: true,
                    comentarios: true,
                  },
            });
        } else if (conteudo) {
            RetornoPostagens = await prisma.postagem.findMany({
                where: { conteudo: { contains: conteudo, mode: 'insensitive' } },
                include: {
                    autor: true,
                    categorias: true,
                    comentarios: true,
                  },
            });
        } else if (id) {
            RetornoPostagens = await prisma.postagem.findMany({
                where: {
                    id: parseInt(id)  // Convertendo o id para inteiro e usando 'equals'
                },
                include: {
                    autor: true,
                    categorias: true,
                    comentarios: true,
                },
            });
        } else {
            // Se nenhum parâmetro for fornecido, retorna todos os posts
            RetornoPostagens = await prisma.postagem.findMany();
        }
        res.json(RetornoPostagens);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar as postagens', details: error.message });
    }
};

const updatePostagem = async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, categorias } = req.body;
    try {
        const postagemAtualizada = await prisma.postagem.update({
            where: { id: parseInt(id) },
            data: {
                titulo,
                conteudo,
                categorias: categorias && Array.isArray(categorias)
                    ? {
                        set: categorias.map((categoriaId) => ({ id: categoriaId })),
                    }
                    : undefined,
            },
            include: {
                categorias: true,
            },
        });
        res.json(postagemAtualizada);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a postagem', details: error.message });
    }
};

const deletePostagem = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.postagem.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Postagem excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir a postagem', details: error.message });
    }
};

module.exports = {
    createPostagem,
    getPostagens,
    updatePostagem,
    deletePostagem,
};