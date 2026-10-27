import Cartao from "../components/ui/Cartao.jsx";
import Icon from "../components/ui/Icon.jsx";

export default function EmBreve({ titulo, icone }) {
  return (
    <main className="coluna-unica">
      <Cartao className="em-breve">
        <Icon nome={icone} tamanho={48} />
        <h1>{titulo}</h1>
        <p>Seção demonstrativa: será implementada em uma próxima etapa.</p>
        <a className="botao botao--primario" href="#/inicio">Voltar ao início</a>
      </Cartao>
    </main>
  );
}
