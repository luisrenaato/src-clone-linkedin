import Cartao from "../ui/Cartao.jsx";
import PessoaLinha from "../network/PessoaLinha.jsx";
import { useDados } from "../../context/useDados.js";

export default function SugestoesCard() {
  const { pessoas, conexoes } = useDados();
  const sugestoes = pessoas.filter((p) => conexoes[p.id] !== "conectado").slice(0, 4);
  if (sugestoes.length === 0) return null;
  return (
    <Cartao className="lateral">
      <h2>Pessoas que você talvez conheça</h2>
      <ul className="pessoas">
        {sugestoes.map((p) => (
          <PessoaLinha key={p.id} pessoa={p} tamanho={40} />
        ))}
      </ul>
      <a className="lateral__mais" href="#/rede">Ver todas</a>
    </Cartao>
  );
}
