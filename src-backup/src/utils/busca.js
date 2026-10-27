import { normalizar } from "./texto.js";

/** Busca local em pessoas e publicações (nenhuma requisição externa). */
export function buscar(consulta, { pessoas, posts, autorDe }) {
  const termo = normalizar(consulta.trim());
  if (!termo) return { pessoas: [], posts: [] };
  return {
    pessoas: pessoas.filter((p) => normalizar(`${p.nome} ${p.cargo}`).includes(termo)),
    posts: posts.filter((p) =>
      normalizar(`${p.texto} ${autorDe(p.autorId).nome}`).includes(termo),
    ),
  };
}
