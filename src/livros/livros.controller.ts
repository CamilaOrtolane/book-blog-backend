import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LivrosService } from './livros.service';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Get()
  buscarAleatorios() {
    return this.livrosService.buscarAleatorios();
  }

  @Get('catalogo')
  buscarCatalogo() {
    return this.livrosService.buscarCatalogo();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.livrosService.buscarPorId(Number(id));
  }

  @Post(':id/avaliar')
  avaliarLivro(
    @Param('id') id: string,
    @Body() body: { nota_ava: number; id_usu?: number },
  ) {
    return this.livrosService.avaliarLivro(
      Number(id),
      Number(body.nota_ava),
      body.id_usu ?? 1,
    );
  }
}