import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Body,
  Param,
  Res,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePreservationDto } from './dto/create-preservation.dto';
import { PreserveService } from './preserve.service';
import { Response } from 'express';
import axios from 'axios';
import { config } from '../config';

@Controller('preserve')
export class PreserveController {
  constructor(private readonly preserveService: PreserveService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${unique}${ext}`);
        },
      }),
    }),
  )
  async preserve(
    @UploadedFile() file: Express.Multer.File,
    @Body() metadados: CreatePreservationDto,
  ) {
    return this.preserveService.handlePreservation(file, metadados);
  }

  @Get('user/:userId')
  async listDocumentsByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.preserveService.getDocumentsByUser(userId);
  }

  @Get('download/:documentId')
  async downloadDocument(
    @Param('documentId', ParseIntPipe) documentId: number,
    @Res() res: Response,
  ) {
    try {
      const document = await this.preserveService.getDocumentById(documentId);
      
      if (!document?.transferUUID) {
        throw new NotFoundException('Documento ou Transfer UUID não encontrado');
      }

      const response = await axios.get(
        `${config.storageUrl}/api/v2/file/${document.transferUUID}/download/`,
        {
          headers: {
            Authorization: `ApiKey ${config.storageUsername}:test`,
          },
          responseType: 'stream',
        },
      );

      res.set({
        'Content-Disposition': response.headers['content-disposition'],
        'Content-Type': response.headers['content-type'],
      });

      response.data.pipe(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).send(error.message);
      } else {
        console.error('Erro no download:', error);
        res.status(500).send('Erro ao baixar o arquivo');
      }
    }
  }
}

