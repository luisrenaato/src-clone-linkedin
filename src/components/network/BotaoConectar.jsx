import Icon from "../ui/Icon.jsx";
import { useDados } from "../../context/useDados.js";

/** Conectar / Pendente / Conectado (demonstrativo: convites nunca são aceitos). */
export default function BotaoConectar({ pessoaId }) {
  const { conexoes, alternarConexao } = useDados();
  const status = conexoes[pessoaId];

  if (status === "conectado") {
    return (
      <span className="botao botao--contorno botao--pequeno botao--desativado">
        <Icon nome="check" tamanho={16} /> Conectado
      </span>
    );
  }
  return (
    <button
      type="button"
      className="botao botao--contorno botao--pequeno"
      onClick={() => alternarConexao(pessoaId)}
      title={status === "pendente" ? "Clique para cancelar o convite" : undefined}
    >
      <Icon nome={status === "pendente" ? "clock" : "userPlus"} tamanho={16} />
      {status === "pendente" ? "Pendente" : "Conectar"}
    </button>
  );
}
