import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function FormArtigo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/artigos`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const artigo = res.data.find((a: any) => a.id === Number(id));
          if (artigo) {
            setTitulo(artigo.titulo);
            setConteudo(artigo.conteudo);
          }
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    if (imagem) formData.append('imagem', imagem);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/artigos/${id}`, formData, config);
      } else {
        await axios.post(`http://localhost:3000/api/artigos`, formData, config);
      }
      navigate('/dashboard');
    } catch (error) {
      alert('Erro ao salvar artigo');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-4">{id ? 'Editar' : 'Novo'} Artigo</h1>

        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <textarea
          placeholder="Conteúdo"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          className="w-full border p-2 mb-3 rounded h-40 resize-none"
          required
        />

        <input
          type="file"
          onChange={(e) => setImagem(e.target.files?.[0] || null)}
          className="mb-3"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {id ? 'Atualizar' : 'Criar'}
        </button>
      </form>
    </div>
  );
}
