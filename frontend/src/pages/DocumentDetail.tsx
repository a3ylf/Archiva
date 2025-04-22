import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserDocuments, downloadDocument } from '../services/api';
import { Document } from '../types';

const DocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      if (!id) {
        console.error('ID do documento não encontrado.');
        navigate('/documents', { replace: true });
        return;
      }

      try {
        const doc = await fetchUserDocuments();
        setDocument(doc);
      } catch (error) {
        console.error('Erro ao carregar documento:', error);
        navigate('/documents', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id, navigate]);

  const handleDownload = async () => {
    if (!id) return;

    try {
      const response = await downloadDocument(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const disposition = response.headers['content-disposition'];
      const filename = disposition ? disposition.split('filename=')[1].replace(/"/g, '') : 'document.7z';

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Erro no download:', error);
      alert('Falha ao baixar o documento');
    }
  };

  if (loading) return <div>Carregando detalhes...</div>;

  if (!document) return <p>Documento não encontrado.</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Voltar</button>
      <h1>{document.author}</h1>
      <div>
        <p>Categoria: {document.category}</p>
        <p>Status: {document.status}</p>
        <p>Data: {new Date(document.date).toLocaleDateString('pt-BR')}</p>
        <p>Tamanho: {document.size} MB</p>
        <button 
          onClick={handleDownload}
          disabled={document.status !== 'completo'} 
        >
          {document.status === 'completo' ? 'Baixar Documento' : 'Processando...'}
        </button>
      </div>
    </div>
  );
};

export default DocumentDetail;

