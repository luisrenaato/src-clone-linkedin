import { useState } from "react";
import { hrefBusca } from "../../hooks/useRota.js";

const LIMITE = 220;

/** Corta no último espaço antes do limite, para não partir palavras/hashtags. */
function cortar(texto) {
  const trecho = texto.slice(0, LIMITE);
  const espaco = trecho.lastIndexOf(" ");
  return (espaco > LIMITE * 0.6 ? trecho.slice(0, espaco) : trecho).trimEnd();
}

/** Texto da publicação: #hashtags viram links de busca; textos longos têm "ver mais". */
export default function TextoPost({ texto }) {
  const [expandido, setExpandido] = useState(false);
  const longo = texto.length > LIMITE;
  const visivel = longo && !expandido ? `${cortar(texto)}…` : texto;
  const partes = visivel.split(/(#[\p{L}\d_]+)/gu);

  return (
    <p className="post__texto">
      {partes.map((parte, i) =>
        parte.startsWith("#") ? (
          <a key={i} className="hashtag" href={hrefBusca(parte)}>
            {parte}
          </a>
        ) : (
          parte
        ),
      )}
      {longo && !expandido && (
        <button type="button" className="botao-link" onClick={() => setExpandido(true)}>
          ver mais
        </button>
      )}
    </p>
  );
}
