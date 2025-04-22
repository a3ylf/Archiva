import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePreservationDto } from './dto/create-preservation.dto';
import * as path from 'path';
import { createSIP, startTransfer } from '../archivematica/createandmovesip';

@Injectable()
export class PreserveService {
    constructor(private readonly prisma: PrismaService) { }

    async handlePreservation(file: Express.Multer.File, dto: CreatePreservationDto) {
        const fullPath = path.resolve(file.path);
        const sipName = path.basename(file.filename, path.extname(file.filename));
        console.log(sipName)
        const outputDir = await createSIP([fullPath], sipName);
        const transferUuid = await startTransfer(sipName);

        const document = await this.prisma.document.create({
            data: {
                author: dto.author,
                category: dto.category,
                status: "iniciado",
                date: dto.date,
                size: dto.size,
                transferUUID: transferUuid,
                userId: dto.userId,
            },
        });

        return {
            message: 'Documento preservado com sucesso.',
            document,
        };
    }
    async getDocumentsByUser(userId: number) {
        return this.prisma.document.findMany({
            where: { userId },
        });
    }

    async getDocumentById(documentId: number) {
        return this.prisma.document.findUnique({
            where: { id: documentId },
        });
    }
}

