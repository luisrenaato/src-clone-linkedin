import Cartao from "../components/ui/Cartao.jsx";
import PessoaLinha from "../components/network/PessoaLinha.jsx";
import { useDados } from "../context/useDados.js";

function Lista({ titulo, pessoas, vazio }) {
  return (
    <Cartao className="lateral">
      <h2>{titulo} ({pessoas.length})</h2>
      {pessoas.length === 0 ? <p className="lateral__nota">{vazio}</p> : (
        <ul className="pessoas">{pessoas.map((p) => <PessoaLinha key={p.id} pessoa={p} />)}</ul>
      )}
    </Cartao>
  );
}

export default function RedePage() {
  const { pessoas, conexoes } = useDados();
  const por = (s) => pessoas.filter((p) => conexoes[p.id] === s);
  return (
    <main className="coluna-unica">
      <h1 className="titulo-pagina">Minha rede</h1>
      <Lista titulo="Convites enviados" pessoas={por("pendente")} vazio="Nenhum convite pendente." />
      <Lista titulo="Pessoas que você talvez conheça" pessoas={pessoas.filter((p) => !conexoes[p.id])} vazio="Sem novas sugestões." />
      <Lista titulo="Suas conexões" pessoas={por("conectado")} vazio="Você ainda não tem conexões." />
    </main>
  );
}
