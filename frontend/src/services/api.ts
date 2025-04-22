import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchUserDocuments = async (): Promise<Document[]> => {
  const userId = localStorage.getItem('userId');
  if (!userId) throw new Error('Usuário não está logado.');

  try {
    const response = await api.get(`/preserve/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    throw error;
  }
};

export const downloadDocument = async (documentId: string) => {
  try {
    const response = await api.get(`/preserve/download/${documentId}`, {
      responseType: 'blob',
    });

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
    console.error('Erro ao baixar documento:', error);
    throw error;
  }
};

