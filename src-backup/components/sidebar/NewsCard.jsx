import Cartao from "../ui/Cartao.jsx";
import { NOTICIAS } from "../../data/seed.js";

export default function NewsCard() {
  return (
    <Cartao className="lateral">
      <h2>Notícias em destaque</h2>
      <ul className="noticias">
        {NOTICIAS.map((n) => (
          <li key={n.id}>
            <strong>{n.titulo}</strong>
            <small>{n.meta}</small>
          </li>
        ))}
      </ul>
      <p className="lateral__nota">Conteúdo de exemplo (fictício).</p>
    </Cartao>
  );
}
