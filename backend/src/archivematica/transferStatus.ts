import axios from 'axios';
import { config } from '../config'; // ajuste conforme sua estrutura

// Substitua pelo UUID real da sua transferência
const transferUUID = '81f0aecc-1065-42ab-905c-030684ca41e4'
const transferUUID2 = '0a6d7445-dbf7-4cd6-a358-a6efbb47f834'

async function fetchTransferStatus(uuid: string) {
    try {
        const response = await axios.get(
            `${config.dashboardUrl}/api/transfer/status/${uuid}/`,
            {
                headers: {
                    'Authorization': `ApiKey ${config.dashboardApiKey}:test`,
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('Status da transferência:', response.data);
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

fetchTransferStatus(transferUUID);
fetchTransferStatus(transferUUID2);

