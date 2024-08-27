const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um novo comentário
const createComentario = async (req, res) => {
    const { texto, userId, postagemId } = req.body;

    try {
        const novoComentario = await prisma.comentario.create({
            data: {
                texto,
                autor: {
                    connect: { id: userId },
                },
                ComentariosPostagem: {
                    connect: { id: postagemId },
                },
            },
        });

        res.status(201).json(novoComentario);
    } catch (error) {
        console.error('Erro ao criar o comentário:', error);
        res.status(500).json({ error: 'Erro ao criar o comentário', details: error.message });
    }
};

// Listar todos os comentários
const getComentarios = async (req, res) => {
    try {
        const comentarios = await prisma.comentario.findMany({
            include: {
                autor: true,
                ComentariosPostagem: true,
            },
        });
        res.json(comentarios);
    } catch (error) {
        console.error('Erro ao listar os comentários:', error);
        res.status(500).json({ error: 'Erro ao listar os comentários', details: error.message });
    }
};

// Atualizar um comentário pelo ID
const updateComentario = async (req, res) => {
    const { id } = req.params;
    const { texto } = req.body;

    try {
        const comentarioAtualizado = await prisma.comentario.update({
            where: { id: parseInt(id) },
            data: { texto },
        });

        res.json(comentarioAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar o comentário:', error);
        res.status(500).json({ error: 'Erro ao atualizar o comentário', details: error.message });
    }
};

// Excluir um comentário pelo ID
const deleteComentario = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.comentario.delete({
            where: { id: parseInt(id) },
        });

        res.json({ message: 'Comentário excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir o comentário:', error);
        res.status(500).json({ error: 'Erro ao excluir o comentário', details: error.message });
    }
};

module.exports = {
    createComentario,
    getComentarios,
    updateComentario,
    deleteComentario,
};