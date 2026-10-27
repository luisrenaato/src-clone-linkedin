import { useEffect, useRef } from "react";

/** Fecha menus ao clicar fora ou pressionar Esc. Retorna o ref do contêiner. */
export function useFecharFora(aberto, fechar) {
  const ref = useRef(null);
  useEffect(() => {
    if (!aberto) return undefined;
    const aoClicar = (e) => {
      if (ref.current && !ref.current.contains(e.target)) fechar();
    };
    const aoTecla = (e) => {
      if (e.key === "Escape") fechar();
    };
    document.addEventListener("mousedown", aoClicar);
    document.addEventListener("keydown", aoTecla);
    return () => {
      document.removeEventListener("mousedown", aoClicar);
      document.removeEventListener("keydown", aoTecla);
    };
  }, [aberto, fechar]);
  return ref;
}
