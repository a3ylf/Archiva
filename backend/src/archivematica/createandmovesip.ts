import * as fs from 'fs-extra';
import * as path from 'path';
import axios from 'axios';
import qs from 'qs';
import * as os from 'os';
import { config } from '../config';

// CONFIGURAÇÕES
const ARCHIVEMATICA_URL = config.dashboardUrl; // endpoint da pipeline
const API_KEY = config.dashboardApiKey; //api do dashboard
const LOCATION_UUID = config.locationUuid; // pegue na interface da pipeline

export async function createSIP(inputFiles: string[], metadata: any, sipName: string): Promise<string> {
    const homeDir = os.homedir();

    const outputDir = path.join(
        homeDir,
        `archivematica/hack/submodules/archivematica-sampledata/archiva/${sipName}`
    );
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
export async function startTransfer(sipName: string) {
    const RELATIVE = `/archivematica/archivematica-sampledata/archiva/${sipName}`
    const combined = `${LOCATION_UUID}:${RELATIVE}`;
    const encoded = Buffer.from(combined).toString('base64');

    console.log(encoded);
    const requestBody = qs.stringify({
        name: sipName,
        type: 'standard',
        // TODO RANDOMIZE ACESSION NUMBER!
        accession: '2025-0000',
        "paths[]": encoded

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
        console.log('Transferência iniciada com sucesso:', response.data);
    } catch (error: any) {
        if (error.response) {
            console.error('Erro com resposta HTML:');
            console.error('Status:', error.response.status);
            console.error('HTML:', error.response.data);
        } else {
            console.error('Erro de rede:', error.message);
        }
    }
}

//exemplo de uso
const inputFiles = ['./test1.pdf', './test2.txt'];
const metadata = {
    title: 'Documentos Importantes',
    description: 'Pacote de documentos para preservação digital.',
    dateCreated: new Date().toISOString(),
    author: 'John Doe'
};
const sipName = 'transfer123';

async function process() {
    await createSIP(inputFiles, metadata, sipName);
    await startTransfer(sipName);
}

process().catch(console.error);

