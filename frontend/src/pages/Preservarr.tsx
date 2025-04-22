import React, { useState } from 'react';
import './Preservar.css';

const Preservarr = () => {
  const [pdf, setPdf] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    title: '',
    author: '',
    type: '',
    reason: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setPdf(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetadata((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdf) {
      alert('Por favor, envie um arquivo PDF!');
      return;
    }
    console.log('Enviando PDF e Metadados:', pdf, metadata);
  };

  return (
    <div className="preservar-container">
      <h2>Preservar Novo Documento</h2>
      <form onSubmit={handleSubmit} className="preservar-form">
        <div>
          <label htmlFor="pdf">Arquivo PDF:</label>
          <input type="file" id="pdf" accept="application/pdf" onChange={handleFileChange} required />
        </div>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={metadata.title}
            onChange={handleInputChange}
            placeholder="Título do Documento"
            required
          />
        </div>
        <div>
          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={metadata.author}
            onChange={handleInputChange}
            placeholder="Autor do Documento"
            required
          />
        </div>
        <div>
          <label htmlFor="type">Tipo:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={metadata.type}
            onChange={handleInputChange}
            placeholder="Tipo do Documento"
            required
          />
        </div>
        <div>
          <label htmlFor="reason">Motivo da Preservação:</label>
          <textarea
            id="reason"
            name="reason"
            value={metadata.reason}
            onChange={handleInputChange}
            placeholder="Explique por que esse documento deve ser preservado"
            required
          />
        </div>
        <button type="submit">Preservar</button>
      </form>
    </div>
  );
};

export default Preservarr;

