import { createSIP } from './archivematica/createSIP';
import { startTransfer } from './archivematica/startTransfer';

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

