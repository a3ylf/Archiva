import * as fs from 'fs-extra';
import * as path from 'path';
import axios from 'axios';
import qs from 'qs';

// CONFIGURAÇÕES
const ARCHIVEMATICA_URL = 'http://localhost:62080'; // endpoint da pipeline
const API_KEY = 'test';
// const LOCATION_UUID = 'SEU_LOCATION_UUID'; // pegue na interface da pipeline

// Função para criar o SIP
export async function createSIP(inputFiles: string[], metadata: any, sipName: string): Promise<string> {
  const outputDir = path.join(__dirname, sipName);
  const filesDir = path.join(outputDir, 'files');

  await fs.ensureDir(filesDir);

  for (const file of inputFiles) {
    const fileName = path.basename(file);
    await fs.copy(file, path.join(filesDir, fileName));
  }

  const metadataPath = path.join(outputDir, 'metadata.json');
  await fs.writeJSON(metadataPath, metadata, { spaces: 2 });

  console.log(`✅ SIP criado em: ${outputDir}`);
  return outputDir;
}

// Função para iniciar a transferência via API
export async function startTransfer(sipName:string) {
  // Definindo os parâmetros da transferência
  const requestBody = qs.stringify({
    name: sipName,
    type: 'standard',
    accession: '2019-1234',
  });

  try {
    // Enviando a requisição para o servidor
    const response = await axios.post(
      `${ARCHIVEMATICA_URL}/api/transfer/start_transfer/`,
      requestBody,
      {
        headers: {
          'Authorization': `ApiKey ${API_KEY}:test`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    console.log('🚀 Transferência iniciada com sucesso:', response.data);
  } catch (error: any) {
    if (error.response) {
      // If the response is HTML (like an error page)
      console.error('Erro com resposta HTML:');
      console.error('Status:', error.response.status);
      console.error('HTML:', error.response.data);  // Here you get the HTML body
    } else {
      console.error('Erro de rede:', error.message);
    }
  }
}
// ...código das funções createSIP e startTransfer aqui...

// Exemplo de uso (coloca no final do arquivo):
const inputFiles = ['./test1.pdf', './test2.txt'];
const metadata = {
  title: 'Documentos Importantes',
  description: 'Pacote de documentos para preservação digital.',
  dateCreated: new Date().toISOString(),
  author: 'John Doe'
};
const sipName = 'transfer-meu-pacote';

async function process() {
  await createSIP(inputFiles, metadata, sipName);
  await startTransfer(sipName);
}

process().catch(console.error);

