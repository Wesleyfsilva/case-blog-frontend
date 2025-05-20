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

      const { token, nome } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('nome', nome);

      navigate('/dashboard');
    } catch (err: any) {
      setErro(err.response?.data?.erro || 'Erro ao fazer login.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>

        <p className="text-sm mt-4 text-center">
          Não tem uma conta?{' '}
          <a href="/registrar" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
