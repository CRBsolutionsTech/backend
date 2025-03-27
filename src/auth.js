import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Importando o modelo User

// Função de cadastro de usuário
export const signUpNewUser = async (email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Usuário já existe');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return { message: 'Usuário criado com sucesso!' };
  } catch (error) {
    throw error;
  }
};

// Função de login
export const signInWithEmail = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Senha incorreta');
    }

    return { message: 'Login bem-sucedido!' };
  } catch (error) {
    throw error;
  }
};

// Função de resetar senha
export const resetPassword = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Aqui você pode adicionar a lógica para resetar a senha (ex: gerar um link de reset ou um código)
    // Para este exemplo, vamos apenas enviar uma mensagem
    return { message: 'Instruções para resetar a senha foram enviadas!' };
  } catch (error) {
    throw error;
  }
};
