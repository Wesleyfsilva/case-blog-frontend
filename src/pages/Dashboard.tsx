import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Artigo {
  id: number;
  titulo: string;
  conteudo: string;
  imagem: string | null;
  criado_em: string;
}

export default function Dashboard() {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const nomeUsuario = localStorage.getItem('nome');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    navigate('/');
  };

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
    } catch (err) {
      console.error('Erro ao buscar artigos', err);
    }
  };

  const handleExcluir = async (id: number) => {
    const confirmar = confirm('Tem certeza que deseja excluir este artigo?');
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3000/api/artigos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchArtigos(); // atualiza a lista
    } catch (err) {
      alert('Erro ao excluir artigo.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Olá, {nomeUsuario}!</h1>
          <p className="text-sm text-gray-500">Seus artigos:</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate('/novo-artigo')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Novo Artigo
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sair
          </button>
        </div>
      </div>

      {artigos.length === 0 ? (
        <p>Você ainda não publicou nenhum artigo.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {artigos.map((artigo) => (
            <div key={artigo.id} className="bg-white p-4 rounded shadow">
              {artigo.imagem && (
                <img
                  src={`http://localhost:3000/uploads/${artigo.imagem}`}
                  alt={artigo.titulo}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-lg font-semibold">{artigo.titulo}</h2>
              <p className="text-sm text-gray-500 mb-2">
                Publicado em {new Date(artigo.criado_em).toLocaleDateString()}
              </p>

              <div className="flex justify-between">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
