import { useMemo } from "react";
import Cartao from "../components/ui/Cartao.jsx";
import PostCard from "../components/feed/PostCard.jsx";
import PessoaLinha from "../components/network/PessoaLinha.jsx";
import { useDados } from "../context/useDados.js";
import { buscar } from "../utils/busca.js";

export default function BuscaPage({ consulta }) {
  const { pessoas, posts, autorDe } = useDados();
  const res = useMemo(() => buscar(consulta, { pessoas, posts, autorDe }), [consulta, pessoas, posts, autorDe]);

  if (!consulta.trim()) {
    return <main className="coluna-unica"><Cartao className="vazio">Digite algo na barra de pesquisa.</Cartao></main>;
  }
  const nada = res.pessoas.length === 0 && res.posts.length === 0;

  return (
    <main className="coluna-unica">
      <h1 className="titulo-pagina">Resultados para “{consulta}”</h1>
      {nada && <Cartao className="vazio">Nenhum resultado encontrado.</Cartao>}
      {res.pessoas.length > 0 && (
        <Cartao className="lateral">
          <h2>Pessoas</h2>
          <ul className="pessoas">
            {res.pessoas.map((p) => <PessoaLinha key={p.id} pessoa={p} />)}
          </ul>
        </Cartao>
      )}
      {res.posts.length > 0 && (
        <>
          <h2 className="subtitulo-pagina">Publicações</h2>
          <div className="feed">
            {res.posts.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        </>
      )}
    </main>
  );
}
