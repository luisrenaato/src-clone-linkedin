import { useEffect, useRef, useState } from "react";
import Avatar from "../ui/Avatar.jsx";
import Icon from "../ui/Icon.jsx";
import { useDados } from "../../context/useDados.js";

const MAX_CARACTERES = 3000;
const MAX_IMAGEM_BYTES = 700 * 1024; // imagens ficam em localStorage (limite ~5 MB)

export default function ComposerModal({ aoFechar }) {
  const { perfil, publicar, avisar } = useDados();
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState(null);
  const inputArquivo = useRef(null);

  useEffect(() => {
    const aoTecla = (e) => e.key === "Escape" && aoFechar();
    document.addEventListener("keydown", aoTecla);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", aoTecla);
      document.body.style.overflow = overflow;
    };
  }, [aoFechar]);

  function escolherImagem(e) {
    const arquivo = e.target.files?.[0];
    e.target.value = "";
    if (!arquivo) return;
    if (!arquivo.type.startsWith("image/")) return avisar("Escolha um arquivo de imagem.");
    if (arquivo.size > MAX_IMAGEM_BYTES) return avisar("Imagem muito grande para a demonstração (máx. 700 KB).");
    const leitor = new FileReader();
    leitor.onload = () => setImagem(leitor.result);
    leitor.readAsDataURL(arquivo);
  }

  const podePublicar = texto.trim().length > 0 || imagem !== null;

  function enviar(e) {
    e.preventDefault();
    if (!podePublicar) return;
    publicar({ texto: texto.trim(), imagem });
    aoFechar();
  }

  return (
    <div className="modal__fundo" onMouseDown={(e) => e.target === e.currentTarget && aoFechar()}>
      <form className="modal" role="dialog" aria-modal="true" aria-labelledby="titulo-modal" onSubmit={enviar}>
        <header className="modal__cabecalho">
          <div className="modal__autor">
            <Avatar pessoa={perfil} tamanho={56} />
            <div>
              <h2 id="titulo-modal">{perfil.nome}</h2>
              <small>Publicar para qualquer pessoa</small>
            </div>
          </div>
          <button type="button" className="botao-icone" aria-label="Fechar" onClick={aoFechar}>
            <Icon nome="close" />
          </button>
        </header>

        <div className="modal__corpo">
          <textarea
            autoFocus
            value={texto}
            maxLength={MAX_CARACTERES}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Sobre o que você quer falar?"
            aria-label="Texto da publicação"
          />
          {imagem && (
            <div className="modal__previa">
              <img src={imagem} alt="Pré-visualização da imagem anexada" />
              <button type="button" className="botao-icone" aria-label="Remover imagem" onClick={() => setImagem(null)}>
                <Icon nome="close" tamanho={18} />
              </button>
            </div>
          )}
        </div>

        <footer className="modal__rodape">
          <div>
            <input ref={inputArquivo} type="file" accept="image/*" hidden onChange={escolherImagem} />
            <button type="button" className="botao-icone" aria-label="Adicionar imagem" onClick={() => inputArquivo.current?.click()}>
              <Icon nome="image" />
            </button>
          </div>
          <button type="submit" className="botao botao--primario" disabled={!podePublicar}>
            Publicar
          </button>
        </footer>
      </form>
    </div>
  );
}
