import './Preservar.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PreserveModalProps {
  onClose?: () => void; }

const Preservar = ({ onClose }: PreserveModalProps) => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [metadados, setMetadados] = useState({
    author: '',
    category: '',
    date: '',
    size: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMetadados((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetadados({ ...metadados, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setArquivo(file);
      setMetadados((prev) => ({
        ...prev,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      }));
    } else {
      alert('Por favor, selecione um arquivo PDF válido.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!arquivo) return alert('Envie um arquivo PDF antes de continuar.');

    const formData = new FormData();
    formData.append('file', arquivo);
    formData.append('author', metadados.author);
    formData.append('category', metadados.category);
    formData.append('date', metadados.date);
    formData.append('size', metadados.size);

    try {
      const response = await fetch('/preserve', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('✅ Documento enviado para preservação!');
        navigate('/');
      } else {
        alert('❌ Erro ao enviar documento para preservação.\n    Tente novamente mais tarde');
      }
    } catch (error) {
      console.error('Erro no envio:', error);
      alert('❌ Erro de rede. Tente novamente.');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>📄 Novo Documento para Preservação</h3>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            📤 Selecionar PDF:
            <input type="file" accept="application/pdf" onChange={handleFile} required />
          </label>

          <label>
            ✍️ Autor:
            <input name="author" value={metadados.author} onChange={handleChange} placeholder="Nome do autor" required />
          </label>

          <label>
            🗂️ Categoria:
            <input name="category" value={metadados.category} onChange={handleChange} placeholder="Categoria do documento" required />
          </label>

          <label>
            📅 Data:
            <input name="date" value={metadados.date} readOnly />
          </label>

          <label>
            📦 Tamanho:
            <input name="size" value={metadados.size} readOnly />
          </label>

          <div className="modal-actions">
            <button type="submit">✅ Preservar</button>
            <button type="button" className="cancel-btn" onClick={handleClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Preservar;

