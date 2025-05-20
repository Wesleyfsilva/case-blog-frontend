import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function FormArtigo() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    if (id) {
      axios
        .get(`http://localhost:3000/api/artigos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setTitulo(res.data.titulo);
          setConteudo(res.data.conteudo);
        })
        .catch((err) => {
          console.error('Erro ao carregar artigo', err);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      if (id) {
        await axios.put(
          `http://localhost:3000/api/artigos/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        await axios.post(
          'http://localhost:3000/api/artigos',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }
      navigate('/dashboard');
    } catch (err) {
      alert('Erro ao salvar artigo.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl p-8 rounded-xl shadow-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {id ? 'Editar Artigo' : 'Novo Artigo'}
        </h1>

        <div>
          <label className="block text-sm mb-1 text-gray-600">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-600">Conteúdo</label>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-600">Imagem destacada</label>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImagem(e.target.files[0]);
              }
            }}
            className="w-full bg-white text-sm"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {id ? 'Atualizar Artigo' : 'Publicar Artigo'}
        </button>
      </form>
    </div>
  );
}
