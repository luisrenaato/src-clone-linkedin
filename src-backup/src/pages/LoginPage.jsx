import { useState } from "react";
import "../styles/login.css";

export default function LoginPage({ onEntrar }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [manterAcesso, setManterAcesso] = useState(true);
  const [identificador, setIdentificador] = useState("");

  return (
    <div className="pagina-login">
      <header className="cabecalho">
        <a className="logo-linkedin" href="#" aria-label="LinkedIn">
          Linked<span>in</span>
        </a>
      </header>

      <main className="conteudo-login">
        <section className="cartao-login">
          <h1>Entrar</h1>
          <p className="subtitulo">
            Acompanhe as novidades da sua comunidade profissional.
          </p>
          <p className="aviso-demo">
            Modo demonstrativo: qualquer dado entra e nada é enviado a servidores.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onEntrar(identificador);
            }}
          >
            <label htmlFor="email">E-mail ou telefone</label>
            <input
              id="email"
              type="text"
              placeholder="E-mail ou telefone"
              autoComplete="username"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
              required
            />

            <label htmlFor="senha">Senha</label>
            <div className="campo-senha">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                autoComplete="current-password"
                required
              />
              <button type="button" className="botao-exibir" onClick={() => setMostrarSenha(!mostrarSenha)}>
                {mostrarSenha ? "Ocultar" : "Exibir"}
              </button>
            </div>

            <a className="link-azul" href="#recuperar-senha">Esqueceu a senha?</a>

            <label className="opcao-acesso">
              <input type="checkbox" checked={manterAcesso} onChange={(e) => setManterAcesso(e.target.checked)} />
              Manter acesso
            </label>

            <button className="botao-entrar" type="submit">Entrar</button>
          </form>

          <div className="divisor"><span>ou</span></div>

          <button className="botao-alternativo" type="button" onClick={() => onEntrar("")}>
            G Continuar com Google
          </button>
          <button className="botao-alternativo" type="button" onClick={() => onEntrar("")}>
            Continuar com Microsoft
          </button>
          <button className="botao-alternativo" type="button" onClick={() => onEntrar("")}>
            Continuar com Apple
          </button>

          <p className="termos">
            Ao continuar, você aceita o <a href="#contrato">Contrato do Usuário</a>, a{" "}
            <a href="#privacidade">Política de Privacidade</a> e a{" "}
            <a href="#cookies">Política de Cookies</a> do LinkedIn.
          </p>
        </section>

        <p className="cadastro">
          Novo usuário? <a href="#cadastro">Cadastre-se agora</a>
        </p>
      </main>

      <footer className="rodape">
        <span>LinkedIn © 2026</span>
        <a href="#contrato">Contrato do Usuário</a>
        <a href="#privacidade">Privacidade</a>
        <a href="#ajuda">Ajuda</a>
        <span>Idioma: Português</span>
      </footer>
    </div>
  );
}
