import { useState } from "react";
import Avatar from "../ui/Avatar.jsx";
import Cartao from "../ui/Cartao.jsx";
import Icon from "../ui/Icon.jsx";
import TextoPost from "./TextoPost.jsx";
import Comentarios from "./Comentarios.jsx";
import { useDados } from "../../context/useDados.js";
import { useFecharFora } from "../../hooks/useFecharFora.js";
import { tempoRelativo } from "../../utils/tempo.js";

function Autor({ pessoa, criadoEm, agora }) {
  return (
    <div className="post__autor">
      <Avatar pessoa={pessoa} tamanho={48} />
      <div>
        <strong>{pessoa.nome}</strong>
        <small>{pessoa.cargo}</small>
        <small>{tempoRelativo(criadoEm, agora)}</small>
      </div>
    </div>
  );
}

function PostOriginal({ original }) {
  const { autorDe, agora } = useDados();
  if (!original) {
    return <div className="post__embutido post__indisponivel">Esta publicação não está mais disponível.</div>;
  }
  return (
    <div className="post__embutido">
      <Autor pessoa={autorDe(original.autorId)} criadoEm={original.criadoEm} agora={agora} />
      <TextoPost texto={original.texto} />
      {original.imagem && <img className="post__imagem" src={original.imagem} alt="" />}
      <a className="botao-link" href={`#/post/${original.id}`}>Ver publicação original</a>
    </div>
  );
}

export default function PostCard({ post }) {
  const { posts, autorDe, agora, alternarCurtida, repostar, excluir, avisar } = useDados();
  const [comentariosAbertos, setComentariosAbertos] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [compAberto, setCompAberto] = useState(false);
  const refMenu = useFecharFora(menuAberto, () => setMenuAberto(false));
  const refComp = useFecharFora(compAberto, () => setCompAberto(false));

  const autor = autorDe(post.autorId);
  const ehMeu = post.autorId === "eu";
  const original = post.repostDeId ? posts.find((p) => p.id === post.repostDeId) : null;
  const totalComentarios = post.comentarios.length;

  async function copiarLink() {
    setMenuAberto(false);
    setCompAberto(false);
    const link = `${window.location.origin}${window.location.pathname}#/post/${post.id}`;
    try {
      await navigator.clipboard.writeText(link);
      avisar("Link copiado para a área de transferência.");
    } catch {
      avisar("Não foi possível copiar o link neste navegador.");
    }
  }

  return (
    <Cartao as="article" className="post" aria-label={`Publicação de ${autor.nome}`}>
      <header className="post__cabecalho">
        <Autor pessoa={autor} criadoEm={post.criadoEm} agora={agora} />
        <div className="post__menu" ref={refMenu}>
          <button
            type="button"
            className="botao-icone"
            aria-label="Mais opções da publicação"
            aria-haspopup="menu"
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((v) => !v)}
          >
            <Icon nome="more" />
          </button>
          {menuAberto && (
            <div className="menu-suspenso" role="menu">
              <button type="button" role="menuitem" onClick={copiarLink}>
                <Icon nome="link" tamanho={16} /> Copiar link
              </button>
              {ehMeu && (
                <button type="button" role="menuitem" onClick={() => excluir(post.id)}>
                  <Icon nome="trash" tamanho={16} /> Excluir publicação
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {post.texto && <TextoPost texto={post.texto} />}
      {post.imagem && <img className="post__imagem" src={post.imagem} alt="Imagem anexada à publicação" />}
      {post.repostDeId && <PostOriginal original={original} />}

      {(post.curtidas > 0 || totalComentarios > 0 || post.compartilhamentos > 0) && (
        <div className="post__contadores">
          {post.curtidas > 0 ? (
            <span className="post__curtidas">
              <span className="selo-curtida"><Icon nome="like" tamanho={11} preenchido /></span>
              {post.curtidas}
            </span>
          ) : (
            <span />
          )}
          <span>
            {totalComentarios > 0 && (
              <button type="button" className="botao-link botao-link--suave" onClick={() => setComentariosAbertos(true)}>
                {totalComentarios} {totalComentarios === 1 ? "comentário" : "comentários"}
              </button>
            )}
            {totalComentarios > 0 && post.compartilhamentos > 0 && " • "}
            {post.compartilhamentos > 0 &&
              `${post.compartilhamentos} ${post.compartilhamentos === 1 ? "compartilhamento" : "compartilhamentos"}`}
          </span>
        </div>
      )}

      <div className="post__acoes">
        <button
          type="button"
          className={`post__acao${post.curtidoPorMim ? " post__acao--ativa" : ""}`}
          aria-pressed={post.curtidoPorMim}
          onClick={() => alternarCurtida(post.id)}
        >
          <Icon nome="like" tamanho={20} preenchido={post.curtidoPorMim} /> Curtir
        </button>
        <button
          type="button"
          className="post__acao"
          aria-expanded={comentariosAbertos}
          onClick={() => setComentariosAbertos((v) => !v)}
        >
          <Icon nome="comment" tamanho={20} /> Comentar
        </button>
        <div className="post__compartilhar" ref={refComp}>
          <button
            type="button"
            className="post__acao"
            aria-haspopup="menu"
            aria-expanded={compAberto}
            onClick={() => setCompAberto((v) => !v)}
          >
            <Icon nome="repeat" tamanho={20} /> Compartilhar
          </button>
          {compAberto && (
            <div className="menu-suspenso menu-suspenso--acima" role="menu">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setCompAberto(false);
                  repostar(post.id);
                }}
              >
                <Icon nome="repeat" tamanho={16} /> Repostar no meu feed
              </button>
              <button type="button" role="menuitem" onClick={copiarLink}>
                <Icon nome="link" tamanho={16} /> Copiar link
              </button>
            </div>
          )}
        </div>
      </div>

      {comentariosAbertos && <Comentarios post={post} />}
    </Cartao>
  );
}
