import express from 'express';
import mongoose from 'mongoose';
import { signUpNewUser, signInWithEmail, resetPassword } from './src/auth.js'; // Importando a função resetPassword corretamente
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON

// Conexão com o MongoDB local
const mongoUri = 'mongodb://localhost:27017/meubanco';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB local');
  })
  .catch((err) => {
    console.error('Erro de conexão ao MongoDB', err);
  });

// Definição das rotas
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await signUpNewUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro durante o cadastro.', error: error.message });
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await signInWithEmail(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro durante o login.', error: error.message });
  }
});

app.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await resetPassword(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao resetar a senha.', error: error.message });
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
