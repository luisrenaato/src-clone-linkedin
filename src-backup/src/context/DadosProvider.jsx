import { useCallback, useEffect, useMemo, useState } from "react";
import { DadosContexto } from "./DadosContexto.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { novoId } from "../utils/texto.js";
import {
  CONEXOES_INICIAIS,
  DESCONHECIDO,
  PESSOAS,
  criarPostsIniciais,
} from "../data/seed.js";

/**
 * Estado global da aplicação (sessão demonstrativa).
 * Tudo é persistido apenas em localStorage; não há backend.
 */
export default function DadosProvider({ usuario, sair, children }) {
  const [posts, setPosts] = useLocalStorage("clone:posts", criarPostsIniciais);
  const [conexoes, setConexoes] = useLocalStorage("clone:conexoes", CONEXOES_INICIAIS);
  const [agora, setAgora] = useState(() => Date.now());
  const [aviso, setAviso] = useState(null);

  const perfil = useMemo(
    () => ({
      id: "eu",
      nome: usuario.nome,
      cargo: "Perfil demonstrativo • clone independente",
      cor: "#0a66c2",
    }),
    [usuario.nome],
  );

  // Atualiza os tempos relativos ("5 min") a cada minuto.
  useEffect(() => {
    const t = setInterval(() => setAgora(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!aviso) return undefined;
    const t = setTimeout(() => setAviso(null), 2800);
    return () => clearTimeout(t);
  }, [aviso]);

  const avisar = useCallback((msg) => setAviso({ msg, id: novoId() }), []);

  const autorDe = useCallback(
    (id) => (id === "eu" ? perfil : (PESSOAS.find((p) => p.id === id) ?? DESCONHECIDO)),
    [perfil],
  );

  const publicar = useCallback(
    ({ texto, imagem }) => {
      const criadoEm = Date.now();
      setAgora(criadoEm);
      setPosts((a) => [
        {
          id: novoId(), autorId: "eu", texto, imagem: imagem ?? null, criadoEm,
          curtidas: 0, curtidoPorMim: false, compartilhamentos: 0,
          comentarios: [], repostDeId: null,
        },
        ...a,
      ]);
      avisar("Publicação criada.");
    },
    [setPosts, avisar],
  );

  const alternarCurtida = useCallback(
    (postId) =>
      setPosts((a) =>
        a.map((p) =>
          p.id === postId
            ? {
                ...p,
                curtidoPorMim: !p.curtidoPorMim,
                curtidas: p.curtidas + (p.curtidoPorMim ? -1 : 1),
              }
            : p,
        ),
      ),
    [setPosts],
  );

  const comentar = useCallback(
    (postId, texto) => {
      const criadoEm = Date.now();
      setAgora(criadoEm);
      setPosts((a) =>
        a.map((p) =>
          p.id === postId
            ? { ...p, comentarios: [...p.comentarios, { id: novoId(), autorId: "eu", texto, criadoEm }] }
            : p,
        ),
      );
    },
    [setPosts],
  );

  const repostar = useCallback(
    (postId) => {
      const criadoEm = Date.now();
      setAgora(criadoEm);
      setPosts((a) => {
        const alvo = a.find((p) => p.id === postId);
        if (!alvo) return a;
        const origemId = alvo.repostDeId ?? alvo.id; // nunca encadeia reposts
        return [
          {
            id: novoId(), autorId: "eu", texto: "", imagem: null, criadoEm,
            curtidas: 0, curtidoPorMim: false, compartilhamentos: 0,
            comentarios: [], repostDeId: origemId,
          },
          ...a.map((p) =>
            p.id === origemId ? { ...p, compartilhamentos: p.compartilhamentos + 1 } : p,
          ),
        ];
      });
      avisar("Publicação compartilhada no seu feed.");
    },
    [setPosts, avisar],
  );

  const excluir = useCallback(
    (postId) => {
      setPosts((a) => a.filter((p) => p.id !== postId));
      avisar("Publicação excluída.");
    },
    [setPosts, avisar],
  );

  /** Conectar → Pendente → (clicar de novo) cancela o convite. Demonstrativo: ninguém aceita. */
  const alternarConexao = useCallback(
    (pessoaId) =>
      setConexoes((c) => {
        const novo = { ...c };
        if (novo[pessoaId] === "pendente") delete novo[pessoaId];
        else if (!novo[pessoaId]) novo[pessoaId] = "pendente";
        return novo;
      }),
    [setConexoes],
  );

  const valor = useMemo(
    () => ({
      perfil, pessoas: PESSOAS, posts, conexoes, agora, aviso,
      autorDe, avisar, publicar, alternarCurtida, comentar, repostar, excluir,
      alternarConexao, sair,
    }),
    [perfil, posts, conexoes, agora, aviso, autorDe, avisar, publicar,
      alternarCurtida, comentar, repostar, excluir, alternarConexao, sair],
  );

  return (
    <DadosContexto.Provider value={valor}>
      {children}
      {aviso && (
        <div key={aviso.id} className="toast" role="status">
          {aviso.msg}
        </div>
      )}
    </DadosContexto.Provider>
  );
}
