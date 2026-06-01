import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivrosModule } from './livros/livros.module';

@Module({
  imports: [LivrosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
