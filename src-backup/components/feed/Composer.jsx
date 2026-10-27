import { useCallback, useState } from "react";
import Avatar from "../ui/Avatar.jsx";
import Cartao from "../ui/Cartao.jsx";
import Icon from "../ui/Icon.jsx";
import ComposerModal from "./ComposerModal.jsx";
import { useDados } from "../../context/useDados.js";

export default function Composer() {
  const { perfil, avisar } = useDados();
  const [aberto, setAberto] = useState(false);
  const fechar = useCallback(() => setAberto(false), []);
  const demo = (nome) => () => avisar(`${nome}: recurso demonstrativo, ainda não implementado.`);

  return (
    <Cartao className="composer">
      <div className="composer__linha">
        <Avatar pessoa={perfil} tamanho={48} />
        <button type="button" className="composer__campo" onClick={() => setAberto(true)}>
          Começar publicação
        </button>
      </div>
      <div className="composer__atalhos">
        <button type="button" onClick={() => setAberto(true)}>
          <Icon nome="image" className="cor-azul" /> Foto
        </button>
        <button type="button" onClick={demo("Evento")}>
          <Icon nome="calendar" className="cor-laranja" /> Evento
        </button>
        <button type="button" onClick={demo("Artigo")}>
          <Icon nome="article" className="cor-vermelho" /> Artigo
        </button>
      </div>
      {aberto && <ComposerModal aoFechar={fechar} />}
    </Cartao>
  );
}
