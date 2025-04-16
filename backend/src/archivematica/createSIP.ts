import { join, basename } from 'path';
import * as os from 'os';
import fs from 'fs-extra';
import { config } from '../config';

//TODO PUT OUTPUTDIR IN .ENV
export async function createSIP(inputFiles: string[], metadata: any, sipName: string): Promise<string> {
    const homeDir = os.homedir();
    const outputDir = join(homeDir, `archivematica/hack/submodules/archivematica-sampledata/archiva/${sipName}`);
    const filesDir = join(outputDir, 'files');

    await fs.ensureDir(filesDir);

    for (const file of inputFiles) {
        const fileName = basename(file);
        await fs.copy(file, join(filesDir, fileName));
    }

    const metadataPath = join(outputDir, 'metadata.json');
    await fs.writeJSON(metadataPath, metadata, { spaces: 2 });

    console.log(`✅ SIP criado em: ${outputDir}`);
    return outputDir;
}

