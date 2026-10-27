import { useState } from "react";
import Icon from "../ui/Icon.jsx";
import Avatar from "../ui/Avatar.jsx";
import SearchBox from "./SearchBox.jsx";
import { useDados } from "../../context/useDados.js";
import { useFecharFora } from "../../hooks/useFecharFora.js";

const ITENS = [
  { id: "inicio", rotulo: "Início", icone: "home" },
  { id: "rede", rotulo: "Minha rede", icone: "users" },
  { id: "vagas", rotulo: "Vagas", icone: "briefcase" },
  { id: "mensagens", rotulo: "Mensagens", icone: "message" },
  { id: "notificacoes", rotulo: "Notificações", icone: "bell" },
];

export default function Navbar({ rota }) {
  const { perfil, sair, avisar } = useDados();
  const [menuAberto, setMenuAberto] = useState(false);
  const refMenu = useFecharFora(menuAberto, () => setMenuAberto(false));
  const ativo = rota.secao === "post" ? "inicio" : rota.secao;

  return (
    <header className="navbar">
      <div className="navbar__interno">
        <a className="navbar__logo" href="#/inicio" aria-label="Página inicial">
          in
        </a>

        {/* key: reinicia o campo quando a consulta da URL muda */}
        <SearchBox key={rota.q} valorInicial={rota.q} />

        <nav className="navbar__nav" aria-label="Navegação principal">
          <ul>
            {ITENS.map((item) => (
              <li key={item.id}>
                <a
                  className={`navbar__item${ativo === item.id ? " navbar__item--ativo" : ""}`}
                  href={`#/${item.id}`}
                  aria-current={ativo === item.id ? "page" : undefined}
                >
                  <Icon nome={item.icone} tamanho={24} />
                  <span>{item.rotulo}</span>
                </a>
              </li>
            ))}

            <li className="navbar__eu" ref={refMenu}>
              <button
                type="button"
                className="navbar__item"
                aria-haspopup="menu"
                aria-expanded={menuAberto}
                onClick={() => setMenuAberto((v) => !v)}
              >
                <Avatar pessoa={perfil} tamanho={24} />
                <span>
                  Eu <Icon nome="chevronDown" tamanho={12} />
                </span>
              </button>
              {menuAberto && (
                <div className="menu-suspenso navbar__menu" role="menu">
                  <div className="navbar__menu-perfil">
                    <Avatar pessoa={perfil} tamanho={48} />
                    <div>
                      <strong>{perfil.nome}</strong>
                      <small>{perfil.cargo}</small>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuAberto(false);
                      avisar("Página de perfil: recurso demonstrativo, ainda não implementado.");
                    }}
                  >
                    Ver perfil
                  </button>
                  <button type="button" role="menuitem" onClick={sair}>
                    <Icon nome="logout" tamanho={16} /> Sair
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
