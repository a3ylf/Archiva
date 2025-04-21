import axios from 'axios';
import {exec} from 'child_process'
import * as fs from 'fs';
import * as path from 'path';
import { config } from '../config'; 

const fileUUID = '0d82faa7-f6bd-4021-8f33-80f33e6b0a42';

async function downloadFile(uuid: string) {
    try {
        const response = await axios.get(
            `${config.storageUrl}/api/v2/file/${uuid}/download/`,
            {
                headers: {
                    'Authorization': `ApiKey ${config.storageUsername}:test`,
                },
                responseType: 'stream', // necessário para baixar o arquivo binário
            }
        );

        const disposition = response.headers['content-disposition'];
        let filename = 'downloaded_file';

        // Tenta extrair o nome do arquivo do cabeçalho, se existir
        if (disposition && disposition.includes('filename=')) {
            const match = disposition.match(/filename="?([^"]+)"?/);
            if (match?.[1]) filename = match[1];
        }

        const filePath = path.join(__dirname, filename);
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        writer.on('finish', () => {
            console.log(`✅ Arquivo salvo como: ${filePath}`);
            unzipFile(filePath,filename)
        });

        writer.on('error', (err) => {
            console.error('❌ Erro ao salvar arquivo:', err);
        });
    } catch (error: any) {
        if (error.response) {
            console.error('❌ Erro com resposta da API:');
            console.error('Status:', error.response.status);
            console.error('Dados:', error.response.data);
        } else {
            console.error('❌ Erro de rede:', error.message);
        }
    }
}
function unzipFile(filePath: string,fileName: string) {
    const outputDir = path.join(__dirname, 'unzipped');
    fs.mkdirSync(outputDir, { recursive: true });

    const command = `7z x "${filePath}" -o"${outputDir}" -y`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Erro ao descompactar: ${error.message}`);
            return;
        }   
        
        const baseFolder = fileName.replace(/\.7z$/, '');  
        const expectedPath = path.join(outputDir,baseFolder, 'data', 'objects', 'files');

        fs.readdir(expectedPath, (err, files) => {
            if (err) {
                console.error('❌ Erro ao acessar arquivos extraídos:', err.message);
                return;
            }

            const pdfFile = files.find(file => file.endsWith('.pdf'));
            if (pdfFile) {
                const fullPath = path.join(expectedPath, pdfFile);
                console.log(`✅ PDF encontrado: ${fullPath}`);
            } else {
                console.warn('⚠️ Nenhum PDF encontrado na pasta esperada.');
            }
        });
    });
}

downloadFile(fileUUID);

