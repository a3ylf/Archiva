import axios from 'axios';
import qs from 'qs';
import { config } from '../config';

export async function startTransfer(sipName: string) {
    const combined = `${config.locationUuid}:/archivematica/archivematica-sampledata/archiva/${sipName}`;
    const encoded = Buffer.from(combined).toString('base64');

    const requestBody = qs.stringify({
        name: sipName,
        type: 'standard',
        accession: '2025-0000',
        "paths[]": encoded
    });

    try {
        const response = await axios.post(
            `${config.dashboardUrl}/api/transfer/start_transfer/`,
            requestBody,
            {
                headers: {
                    'Authorization': `ApiKey ${config.dashboardApiKey}:test`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        console.log('Transferência iniciada com sucesso:', response.data);
    } catch (error: any) {
        console.error('Erro ao iniciar transferência:', error.response?.data || error.message);
    }
}

