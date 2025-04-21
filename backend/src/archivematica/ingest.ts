import axios from 'axios';
import { config } from '../config'; // ajuste o caminho se necessário

async function fetchCompletedIngests() {
    try {
        const response = await axios.get(
            `${config.dashboardUrl}/api/ingest/completed/`,
            {
                headers: {
                    'Authorization': `ApiKey ${config.dashboardApiKey}:test`,
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('✅ Dados recebidos da ingest concluída:', response.data);

        // Exemplo: iterando pelos dados
        for (const item of response.data) {
            console.log('📁 Ingest concluído:', item);
        }

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

// Executa a função ao rodar o script
fetchCompletedIngests();

