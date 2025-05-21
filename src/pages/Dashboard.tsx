import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Artigo {
  id: number;
  titulo: string;
  conteudo: string;
  imagem: string | null;
  criado_em: string;
  autor_nome: string;
  autor_avatar: string;
}

export default function Dashboard() {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const usuarioNome = localStorage.getItem('nome');
  const usuarioAvatar = localStorage.getItem('avatar');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    fetchArtigos();
  }, []);

  const fetchArtigos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/artigos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArtigos(response.data);
    } catch (error) {
      console.error('Erro ao buscar artigos', error);
    }
  };

  const handleExcluir = async (id: number) => {
    const confirmar = confirm('Deseja realmente excluir?');
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3000/api/artigos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchArtigos();
    } catch (error) {
      alert('Erro ao excluir.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Olá, {usuarioNome}</h1>
        <div className="flex items-center gap-3">
          <span className="text-gray-700 text-sm">{usuarioNome}</span>
          {usuarioAvatar && (
            <img
              src={`http://localhost:3000/uploads/usuarios/${usuarioAvatar}`}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate('/novo-artigo')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Artigo
        </button>
      </div>

      {artigos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum artigo encontrado.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artigos.map((artigo) => (
            <div
              key={artigo.id}
              className="bg-white rounded-xl shadow border p-4 flex flex-col"
            >
              {artigo.imagem && (
                <img
                  src={`http://localhost:3000/uploads/artigos/${artigo.imagem}`}
                  alt={artigo.titulo}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h2 className="text-lg font-bold mt-4">{artigo.titulo}</h2>
              <p className="text-sm text-gray-500 mb-2">
                Publicado em {new Date(artigo.criado_em).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                {artigo.conteudo.slice(0, 120)}...
              </p>

              <div className="flex justify-between mt-auto border-t pt-3 text-sm">
                <button
                  onClick={() => navigate(`/editar-artigo/${artigo.id}`)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleExcluir(artigo.id)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </div>

              <div className="flex items-center gap-2 mt-4 border-t pt-3">
                <img
                  src={`http://localhost:3000/uploads/usuarios/${artigo.autor_avatar}`}
                  alt={artigo.autor_nome}
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <span className="text-sm text-gray-600">{artigo.autor_nome}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
