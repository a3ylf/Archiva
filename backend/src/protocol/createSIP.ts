import * as fs from 'fs-extra';
import * as path from 'path';

// Função para criar o SIP (sem compactação)
async function createSIP(inputFiles: string[], metadata: any, outputDir: string) {
  // Assegura que o diretório de saída existe
  await fs.ensureDir(outputDir);

  // Cria o diretório 'files' dentro do diretório de saída
  const filesDir = path.join(outputDir, 'files');
  await fs.ensureDir(filesDir);

  // Copia os arquivos para o diretório 'files'
  for (const file of inputFiles) {
    const fileName = path.basename(file);
    const destination = path.join(filesDir, fileName);
    await fs.copy(file, destination);
  }

  // Escreve os metadados no arquivo 'metadata.json'
  const metadataPath = path.join(outputDir, 'metadata.json');
  await fs.writeJSON(metadataPath, metadata, { spaces: 2 });

  console.log(`SIP criado com sucesso em: ${outputDir}`);
}

// Exemplo de uso
const inputFiles = ['./test1.pdf', './test2.txt'];  // Arquivos para preservar
const metadata = {
  title: 'Documentos Importantes',
  description: 'Pacote de documentos para preservação digital.',
  dateCreated: new Date().toISOString(),
  author: 'John Doe'
};

const outputDir = path.join(__dirname, 'sip-package');

// Cria o SIP
createSIP(inputFiles, metadata, outputDir).catch(err => console.error(err));

