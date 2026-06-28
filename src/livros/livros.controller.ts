import { Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Get()
  buscarAleatorios() {
    return this.livrosService.buscarLivrosAleatorios();
  }
}

