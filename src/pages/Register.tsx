import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!avatar) {
      setErro('Você precisa enviar uma foto de perfil.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('avatar', avatar);

    try {
      await axios.post('http://localhost:3000/api/usuarios/registrar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (err: any) {
      setErro(err.response?.data?.erro || 'Erro ao registrar.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">Registrar</h1>

        {erro && <p className="text-red-600 text-sm text-center">{erro}</p>}

        <div>
          <label className="block mb-1 text-sm text-gray-600">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-600">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-600">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-600">Foto de Perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setAvatar(e.target.files[0]);
              }
            }}
            className="w-full text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
        >
          Criar conta
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Já tem uma conta?{' '}
          <a href="/" className="text-blue-600 hover:underline font-semibold">
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
