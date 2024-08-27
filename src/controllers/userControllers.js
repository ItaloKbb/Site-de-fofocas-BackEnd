const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });  
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Criar um novo usuário
const createUser = async (req, res) => {
    const { email, nome, bio, role, senha } = req.body;
  
    if (!senha) {
      return res.status(400).json({ error: 'Senha é obrigatória' });
    }
  
    const senhaSecreta = await bcrypt.hash(senha, 10);
    try {
      const novoUsuario = await prisma.user.create({
        data: {
          email,
          nome,
          bio,
          role,
          senha: senhaSecreta,
        },
      });
      res.json(novoUsuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o usuário', details: error.message });
    }
};  

// Buscar usuários por nome, email, ou id
const getUser = async (req, res) => {
  const { nome, email, id } = req.query;
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
    } else if (email) {
      usuarios = await prisma.user.findMany({
        where: {
          email: {
            contains: email,
            mode: 'insensitive',
          },
        },
      });
    } else {
      // Se nenhum parâmetro for fornecido, retorna todos os usuários
      usuarios = await prisma.user.findMany();
    }
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o usuário', details: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id || req.query.id;
  const { email, senha, nome } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'User ID is required / User ID é necessário' });
  }

  try {
    const senhaSecreta = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        email,
        senha: senhaSecreta,
        nome,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Realiza o login e gera o token de acesso pelas proximas 10h
const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    //Valida se o usuario recebido existe no banco de dados
    if (!user) {
      return res.status(401).json({ error: 'Não existe nenhuma conta nesse email!' });
    }

    //Compara as senhas criptografadas
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta!' });
    }

    //se tudo foi validado corretamente emite um token com uma validade pré definida
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '10h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  login,
};