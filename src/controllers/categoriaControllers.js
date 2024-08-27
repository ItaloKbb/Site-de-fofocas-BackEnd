const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar uma nova categoria
const createCategoria = async (req, res) => {
    const { name } = req.body;

    try {
        const novaCategoria = await prisma.categoria.create({
            data: { name },
        });

        res.status(201).json(novaCategoria);
    } catch (error) {
        console.error('Erro ao criar a categoria:', error);
        res.status(500).json({ error: 'Erro ao criar a categoria', details: error.message });
    }
};

// Listar todas as categorias
const getCategorias = async (req, res) => {
    try {
        const categorias = await prisma.categoria.findMany();
        res.json(categorias);
    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        res.status(500).json({ error: 'Erro ao listar categorias', details: error.message });
    }
};

// Atualizar uma categoria pelo ID
const updateCategoria = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const categoriaAtualizada = await prisma.categoria.update({
            where: { id: parseInt(id) },
            data: { name },
        });

        res.json(categoriaAtualizada);
    } catch (error) {
        console.error('Erro ao atualizar a categoria:', error);
        res.status(500).json({ error: 'Erro ao atualizar a categoria', details: error.message });
    }
};

// Excluir uma categoria pelo ID
const deleteCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.categoria.delete({
            where: { id: parseInt(id) },
        });

        res.json({ message: 'Categoria excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir a categoria:', error);
        res.status(500).json({ error: 'Erro ao excluir a categoria', details: error.message });
    }
};

module.exports = {
    createCategoria,
    getCategorias,
    updateCategoria,
    deleteCategoria,
};