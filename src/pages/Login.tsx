import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/usuarios/login', {
        email,
        senha,
      });

      const { token, nome, avatar } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('nome', nome);
      localStorage.setItem('avatar', avatar); 


      navigate('/dashboard');
    } catch (err: any) {
      setErro(err.response?.data?.erro || 'Erro ao fazer login.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">Bem-vindo de volta</h1>

        {erro && <p className="text-red-600 text-sm text-center">{erro}</p>}

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
          Entrar
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Não tem uma conta?{' '}
          <a
            href="/registrar"
            className="text-blue-600 hover:underline font-semibold"
          >
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
