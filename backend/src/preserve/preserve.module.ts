import { Module } from '@nestjs/common';
import { PreserveService } from './preserve.service';
import { PreserveController } from './preserve.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PreserveController],
  providers: [PreserveService],
})
export class PreserveModule {}

