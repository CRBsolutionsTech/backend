import mongoose from 'mongoose';

// Definindo o schema de um usuário
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Defina o modelo aqui
const User = mongoose.model('User', userSchema);

export default User;

