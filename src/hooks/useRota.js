import { useEffect, useState } from "react";

/** Roteamento mínimo por hash: #/secao, #/post/ID, #/busca?q=termo. */
function ler() {
  const bruto = window.location.hash.replace(/^#\/?/, "");
  const [caminho, consulta = ""] = bruto.split("?");
  const [secao = "", id = ""] = caminho.split("/");
  return { secao: secao || "inicio", id, q: new URLSearchParams(consulta).get("q") ?? "" };
}

export function useRota() {
  const [rota, setRota] = useState(ler);
  useEffect(() => {
    const aoMudar = () => setRota(ler());
    window.addEventListener("hashchange", aoMudar);
    return () => window.removeEventListener("hashchange", aoMudar);
  }, []);
  return rota;
}

export const irPara = (destino) => {
  window.location.hash = destino;
};
export const hrefBusca = (q) => `#/busca?q=${encodeURIComponent(q)}`;
