import LoginPage from "./pages/LoginPage.jsx";
import AppShell from "./components/layout/AppShell.jsx";
import DadosProvider from "./context/DadosProvider.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { nomeDoIdentificador } from "./utils/texto.js";

/** Porta de entrada: login demonstrativo (sem backend) → aplicação. */
function App() {
  const [sessao, setSessao] = useLocalStorage("clone:sessao", null);

  if (!sessao) {
    return (
      <LoginPage
        onEntrar={(identificador) => {
          window.location.hash = "#/inicio";
          setSessao({ nome: nomeDoIdentificador(identificador) });
        }}
      />
    );
  }

  return (
    <DadosProvider usuario={sessao} sair={() => setSessao(null)}>
      <AppShell />
    </DadosProvider>
  );
}

export default App;
