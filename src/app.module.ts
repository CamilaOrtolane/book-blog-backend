import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivrosModule } from './livros/livros.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [LivrosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
