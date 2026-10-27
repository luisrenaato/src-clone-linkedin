import { useMemo, useState } from "react";
import Icon from "../ui/Icon.jsx";
import Avatar from "../ui/Avatar.jsx";
import { useDados } from "../../context/useDados.js";
import { useFecharFora } from "../../hooks/useFecharFora.js";
import { hrefBusca, irPara } from "../../hooks/useRota.js";
import { buscar } from "../../utils/busca.js";

/** Pesquisa funcional: sugestões ao digitar; Enter abre a página de resultados. */
export default function SearchBox({ valorInicial = "" }) {
  const { pessoas, posts, autorDe } = useDados();
  const [valor, setValor] = useState(valorInicial);
  const [aberto, setAberto] = useState(false);
  const ref = useFecharFora(aberto, () => setAberto(false));

  const termo = valor.trim();
  const resultado = useMemo(
    () => buscar(termo, { pessoas, posts, autorDe }),
    [termo, pessoas, posts, autorDe],
  );
  const mostrar = aberto && termo.length > 0;

  function enviar(e) {
    e.preventDefault();
    if (!termo) return;
    setAberto(false);
    document.activeElement?.blur();
    irPara(hrefBusca(termo));
  }

  return (
    <div className="pesquisa" ref={ref}>
      <form className="pesquisa__form" role="search" onSubmit={enviar}>
        <Icon nome="search" tamanho={18} />
        <input
          type="search"
          value={valor}
          placeholder="Pesquisar"
          aria-label="Pesquisar pessoas e publicações"
          autoComplete="off"
          onChange={(e) => {
            setValor(e.target.value);
            setAberto(true);
          }}
          onFocus={() => setAberto(true)}
        />
      </form>

      {mostrar && (
        <div className="pesquisa__lista">
          {resultado.pessoas.length === 0 && resultado.posts.length === 0 && (
            <p className="pesquisa__vazio">Nenhuma sugestão para “{termo}”.</p>
          )}
          {resultado.pessoas.slice(0, 3).map((p) => (
            <a key={p.id} className="pesquisa__item" href={hrefBusca(p.nome)} onClick={() => setAberto(false)}>
              <Avatar pessoa={p} tamanho={32} />
              <span>
                <strong>{p.nome}</strong>
                <small>{p.cargo}</small>
              </span>
            </a>
          ))}
          {resultado.posts.slice(0, 3).map((p) => (
            <a key={p.id} className="pesquisa__item" href={`#/post/${p.id}`} onClick={() => setAberto(false)}>
              <Icon nome="article" tamanho={20} />
              <span>
                <strong>{autorDe(p.autorId).nome}</strong>
                <small>{p.texto.slice(0, 60) || "Publicação compartilhada"}…</small>
              </span>
            </a>
          ))}
          <a className="pesquisa__todos" href={hrefBusca(termo)} onClick={() => setAberto(false)}>
            Ver todos os resultados para “{termo}”
          </a>
        </div>
      )}
    </div>
  );
}
