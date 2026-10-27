import Avatar from "../ui/Avatar.jsx";
import Cartao from "../ui/Cartao.jsx";
import { useDados } from "../../context/useDados.js";

export default function ProfileCard() {
  const { perfil, conexoes, posts } = useDados();
  const valores = Object.values(conexoes);
  const conectados = valores.filter((v) => v === "conectado").length;
  const pendentes = valores.filter((v) => v === "pendente").length;
  const minhas = posts.filter((p) => p.autorId === "eu").length;

  return (
    <Cartao className="perfil">
      <div className="perfil__capa" />
      <div className="perfil__avatar"><Avatar pessoa={perfil} tamanho={72} /></div>
      <div className="perfil__corpo">
        <h2>{perfil.nome}</h2>
        <p>{perfil.cargo}</p>
      </div>
      <dl className="perfil__stats">
        <div><dt>Conexões</dt><dd>{conectados}</dd></div>
        <div><dt>Convites enviados</dt><dd>{pendentes}</dd></div>
        <div><dt>Suas publicações</dt><dd>{minhas}</dd></div>
      </dl>
    </Cartao>
  );
}
