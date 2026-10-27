import Cartao from "../ui/Cartao.jsx";
import { HASHTAGS } from "../../data/seed.js";
import { hrefBusca } from "../../hooks/useRota.js";

export default function HashtagsCard() {
  return (
    <Cartao className="lateral">
      <h2>Descobrir</h2>
      <ul className="hashtags">
        {HASHTAGS.map((tag) => (
          <li key={tag}><a href={hrefBusca(tag)}>{tag}</a></li>
        ))}
      </ul>
    </Cartao>
  );
}
