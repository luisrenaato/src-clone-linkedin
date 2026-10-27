import { iniciais } from "../../utils/texto.js";

/** Avatar com iniciais (sem imagens externas). */
export default function Avatar({ pessoa, tamanho = 48 }) {
  return (
    <span
      className="avatar"
      style={{
        width: tamanho,
        height: tamanho,
        fontSize: Math.round(tamanho * 0.38),
        background: pessoa.cor,
      }}
      aria-hidden="true"
    >
      {iniciais(pessoa.nome)}
    </span>
  );
}
