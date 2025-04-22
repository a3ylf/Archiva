import * as fs from 'fs-extra';
import * as path from 'path';
import axios from 'axios';
import * as qs from 'qs';
console.log('qs test:', typeof qs.stringify); // deve ser "function"

import * as os from 'os';
import { config } from '../config';

// CONFIGURAÇÕES
const ARCHIVEMATICA_URL = config.dashboardUrl;
const API_KEY = config.dashboardApiKey;
const LOCATION_UUID = config.locationUuid;

export async function createSIP(inputFiles: string[], sipName: string): Promise<string> {
    const homeDir = os.homedir();

    const outputDir = path.join(
        homeDir,
        `${config.output_dir}${sipName}`
    );
    const filesDir = path.join(outputDir, 'files');

    await fs.ensureDir(filesDir);

    for (const file of inputFiles) {
        const fileName = path.basename(file);
        await fs.copy(file, path.join(filesDir, fileName));
    }


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
    console.log(requestBody)

    try {
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

        const path: string = response.data.path;
        const match = path.match(/transfer\d+-([a-f0-9-]+)/);

        if (match && match[1]) {
            const transferUuid = match[1];
            console.log('🧩 UUID da transferência:', transferUuid);
            return transferUuid
            // Você pode agora usar `transferUuid` como quiser
        } else {
            console.warn('⚠️ UUID não encontrado na resposta.');
        }
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


// const inputFiles = [
//     path.resolve(__dirname, 'testdata/test1.pdf'),
//     path.resolve(__dirname, 'testdata/test2.wav')
// ];
// const sipName = 'transfer789';
//
// async function process() {
//     await createSIP(inputFiles, sipName);
//     await startTransfer(sipName);
// }
//
// process().catch(console.error);

