import * as dotenv from 'dotenv';

dotenv.config();

const requiredEnv = [
    'DASHBOARD_URL',
    'DASHBOARD_USERNAME',
    'DASHBOARD_API_KEY',
    'STORAGE_SERVICE_URL',
    'STORAGE_SERVICE_USERNAME',
    'STORAGE_SERVICE_PASSWORD',
    'LOCATION_UUID',
    'OUTPUT_DIR',
    'JWT'
] as const;

for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`❌ Missing required environment variable: ${key}`);
    }
}

export const config = {
    dashboardUrl: process.env.DASHBOARD_URL ?? 'http://localhost:62080',
    dashboardUsername: process.env.DASHBOARD_USERNAME!,
    dashboardApiKey: process.env.DASHBOARD_API_KEY!,

    storageUrl: process.env.STORAGE_SERVICE_URL!,
    storageUsername: process.env.STORAGE_SERVICE_USERNAME!,
    storagePassword: process.env.STORAGE_SERVICE_PASSWORD!,

    locationUuid: process.env.LOCATION_UUID!,
    output_dir: process.env.OUTPUT_DIR!,
    jwt_token: process.env.JWT
};

console.log(config.dashboardUrl)
