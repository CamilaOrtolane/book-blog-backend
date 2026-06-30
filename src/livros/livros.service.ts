import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class LivrosService {
  private pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  async buscarAleatorios() {
    const resultado = await this.pool.query(`
      select 
        l.id_liv as id,
        l.titulo_liv as titulo,
        l.sinopse_liv as sinopse,
        l.isbn_liv as isbn,
        l.ano_publicacao_liv as ano,
        l.capa_liv as capa,
        c.nome_categoria_cat as categoria,
        coalesce(round(avg(a.nota_ava)::numeric, 1), 0) as media
      from livros l
      left join categorias c on c.id_cat = l.id_cat
      left join avaliacoes a on a.id_liv = l.id_liv
      group by l.id_liv, c.nome_categoria_cat
      order by random()
      limit 12;
    `);

    return resultado.rows;

    console.log('DATABASE_URL:', process.env.DATABASE_URL);
  }

  async buscarCatalogo() {
    const resultado = await this.pool.query(`
      select 
        l.id_liv as id,
        l.titulo_liv as titulo,
        l.sinopse_liv as sinopse,
        l.isbn_liv as isbn,
        l.ano_publicacao_liv as ano,
        l.capa_liv as capa,
        c.nome_categoria_cat as categoria,
        coalesce(round(avg(a.nota_ava)::numeric, 1), 0) as media
      from livros l
      left join categorias c on c.id_cat = l.id_cat
      left join avaliacoes a on a.id_liv = l.id_liv
      group by l.id_liv, c.nome_categoria_cat
      order by l.titulo_liv asc;
    `);

    return resultado.rows;
  }

  async buscarPorId(id: number) {
    const resultado = await this.pool.query(
      `
      select 
        l.id_liv as id,
        l.titulo_liv as titulo,
        l.sinopse_liv as sinopse,
        l.isbn_liv as isbn,
        l.ano_publicacao_liv as ano,
        l.capa_liv as capa,
        c.nome_categoria_cat as categoria,
        coalesce(round(avg(a.nota_ava)::numeric, 1), 0) as media
      from livros l
      left join categorias c on c.id_cat = l.id_cat
      left join avaliacoes a on a.id_liv = l.id_liv
      where l.id_liv = $1
      group by l.id_liv, c.nome_categoria_cat;
      `,
      [id],
    );

    return resultado.rows[0];
  }

  async avaliarLivro(id_liv: number, nota_ava: number, id_usu = 1) {
    await this.pool.query(
      `
      insert into avaliacoes (
        nota_ava,
        data_avaliacao_ava,
        id_usu,
        id_liv
      )
      values ($1, current_date, $2, $3);
      `,
      [nota_ava, id_usu, id_liv],
    );

    return {
      mensagem: 'Avaliado com sucesso',
    };
  }

  
}