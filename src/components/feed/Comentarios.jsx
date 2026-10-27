import { useState } from "react";
import Avatar from "../ui/Avatar.jsx";
import { useDados } from "../../context/useDados.js";
import { tempoRelativo } from "../../utils/tempo.js";

export default function Comentarios({ post }) {
  const { perfil, autorDe, comentar, agora } = useDados();
  const [texto, setTexto] = useState("");

  function enviar(e) {
    e.preventDefault();
    const limpo = texto.trim();
    if (!limpo) return;
    comentar(post.id, limpo);
    setTexto("");
  }

  return (
    <div className="comentarios">
      <form className="comentarios__form" onSubmit={enviar}>
        <Avatar pessoa={perfil} tamanho={40} />
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Adicione um comentário…"
          aria-label="Adicionar comentário"
          maxLength={1250}
        />
        {texto.trim() && (
          <button type="submit" className="botao botao--primario botao--pequeno">
            Publicar
          </button>
        )}
      </form>

      <ul className="comentarios__lista">
        {post.comentarios.map((c) => {
          const autor = autorDe(c.autorId);
          return (
            <li key={c.id} className="comentario">
              <Avatar pessoa={autor} tamanho={40} />
              <div className="comentario__balao">
                <div className="comentario__topo">
                  <strong>{autor.nome}</strong>
                  <span>{tempoRelativo(c.criadoEm, agora)}</span>
                </div>
                {autor.cargo && <small>{autor.cargo}</small>}
                <p>{c.texto}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
