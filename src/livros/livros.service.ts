import { Injectable } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import axios from 'axios';

@Injectable()
export class LivrosService {

    async buscarLivros(termo: string) {
      const response = await axios.get('https://openlibrary.org/search.json', {
        params: {
          q: termo,
          limit: 20,
        },
        timeout: 30000,
        headers: {
          'User-Agent': 'book-blog-backend/1.0',
        },
      });

      return response.data.docs.map((livro) => ({
        titulo: livro.title,
        autor: livro.author_name?.[0] ?? 'Autor desconhecido',
        ano: livro.first_publish_year ?? null,
        isbn: livro.isbn?.[0] ?? null,
        capa: livro.cover_i
          ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
          : null,
      }));
    }



  // create(createLivroDto: CreateLivroDto) {
  //   return 'This action adds a new livro';
  // }

  // findAll() {
  //   return `This action returns all livros`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} livro`;
  // }

  // update(id: number, updateLivroDto: UpdateLivroDto) {
  //   return `This action updates a #${id} livro`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} livro`;
  // }
}
