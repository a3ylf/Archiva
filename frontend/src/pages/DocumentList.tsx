import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserDocuments } from '../services/api';
import { Document } from '../types';

const DocumentList = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const docs = await fetchUserDocuments();
        setDocuments(docs);
      } catch (error) {
        console.error('Erro ao carregar documentos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Documentos</h1>
      <ul>
        {documents.map(doc => (
          <li key={doc.id}>
            {doc.author} - <Link to={`/documents/${doc.id}`}>Ver mais</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;

