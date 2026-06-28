import { Injectable } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import axios from 'axios';

@Injectable()
export class LivrosService {

  private temas = [
    'romance',
    'fantasy',
    'mystery',
    'adventure',
    'science fiction',
    'classic literature',
    'drama',
    'young adult',
    'history',
    'poetry',
    'thriller',
    'philosophy',
  ];

  async buscarLivrosAleatorios() {
    const temaSorteado =
      this.temas[Math.floor(Math.random() * this.temas.length)];

    const response = await axios.get('https://openlibrary.org/search.json', {
      params: {
        q: temaSorteado,
        limit: 40,
      },
      timeout: 30000,
      headers: {
        'User-Agent': 'book-blog-backend/1.0',
      },
    });

    const livros = response.data.docs
      .filter((livro) => livro.cover_i)
      .map((livro) => ({
        titulo: livro.title,
        autor: livro.author_name?.[0] ?? 'Autor desconhecido',
        ano: livro.first_publish_year ?? null,
        isbn: livro.isbn?.[0] ?? null,
        capa: `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`,
      }));

    return livros
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);
  }

  async buscarCatalogo() {
  const categorias = [
    'romance',
    'fantasy',
    'horror',
    'mystery',
    'science fiction',
    'adventure',
    'classic literature',
  ];

  const requisicoes = categorias.map((categoria) =>
    axios.get('https://openlibrary.org/search.json', {
      params: {
        q: categoria,
        limit: 20,
      },
      timeout: 30000,
      headers: {
        'User-Agent': 'book-blog-backend/1.0',
      },
    }).then((response) =>
      response.data.docs
        .filter((livro) => livro.cover_i)
        .map((livro) => ({
          titulo: livro.title,
          autor: livro.author_name?.[0] ?? 'Autor desconhecido',
          ano: livro.first_publish_year ?? null,
          isbn: livro.isbn?.[0] ?? null,
          capa: `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`,
          categoria,
        }))
    )
  );

  const resultados = await Promise.all(requisicoes);

  return resultados.flat();
}

}

    // async buscarLivros(termo: string) {
    //   const response = await axios.get('https://openlibrary.org/search.json', {
    //     params: {
    //       q: termo,
    //       limit: 20,
    //     },
    //     timeout: 30000,
    //     headers: {
    //       'User-Agent': 'book-blog-backend/1.0',
    //     },
    //   });

    //   return response.data.docs.map((livro) => ({
    //     titulo: livro.title,
    //     autor: livro.author_name?.[0] ?? 'Autor desconhecido',
    //     ano: livro.first_publish_year ?? null,
    //     isbn: livro.isbn?.[0] ?? null,
    //     capa: livro.cover_i
    //       ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
    //       : null,
    //   }));
    // }



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
