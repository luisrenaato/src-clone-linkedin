import Avatar from "../ui/Avatar.jsx";
import BotaoConectar from "./BotaoConectar.jsx";

export default function PessoaLinha({ pessoa, tamanho = 48 }) {
  return (
    <li className="pessoa">
      <Avatar pessoa={pessoa} tamanho={tamanho} />
      <div className="pessoa__info">
        <strong>{pessoa.nome}</strong>
        <small>{pessoa.cargo}</small>
        <BotaoConectar pessoaId={pessoa.id} />
      </div>
    </li>
  );
}
