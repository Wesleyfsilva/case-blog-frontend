import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/usuarios/registrar', {
        nome,
        email,
        senha,
      });
      navigate('/');
    } catch (err: any) {
      setErro(err.response?.data?.erro || 'Erro ao registrar.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">Criar conta</h1>

        {erro && <p className="text-red-600 text-sm text-center">{erro}</p>}

        <div>
          <label className="block mb-1 text-sm text-gray-600">Nome</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-600">E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-600">Senha</label>
          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
        >
          Cadastrar
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Já tem uma conta?{' '}
          <a
            href="/"
            className="text-blue-600 hover:underline font-semibold"
          >
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
