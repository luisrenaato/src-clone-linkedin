import { useEffect } from "react";
import Navbar from "./Navbar.jsx";
import HomePage from "../../pages/HomePage.jsx";
import BuscaPage from "../../pages/BuscaPage.jsx";
import PostPage from "../../pages/PostPage.jsx";
import RedePage from "../../pages/RedePage.jsx";
import EmBreve from "../../pages/EmBreve.jsx";
import { useRota } from "../../hooks/useRota.js";

const TITULOS = {
  inicio: "Início", rede: "Minha rede", vagas: "Vagas", mensagens: "Mensagens",
  notificacoes: "Notificações", busca: "Pesquisa", post: "Publicação",
};

function Conteudo({ rota }) {
  switch (rota.secao) {
    case "busca": return <BuscaPage consulta={rota.q} />;
    case "post": return <PostPage id={rota.id} />;
    case "rede": return <RedePage />;
    case "vagas": return <EmBreve titulo="Vagas" icone="briefcase" />;
    case "mensagens": return <EmBreve titulo="Mensagens" icone="message" />;
    case "notificacoes": return <EmBreve titulo="Notificações" icone="bell" />;
    default: return <HomePage />;
  }
}

export default function AppShell() {
  const rota = useRota();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${TITULOS[rota.secao] ?? "Início"} | Clone`;
  }, [rota.secao, rota.id, rota.q]);

  return (
    <>
      <Navbar rota={rota} />
      <Conteudo rota={rota} />
    </>
  );
}
