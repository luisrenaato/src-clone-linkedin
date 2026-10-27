import { useEffect, useState } from "react";

/** useState persistido em localStorage (dados ficam só neste navegador). */
export function useLocalStorage(chave, inicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave);
      if (salvo !== null) return JSON.parse(salvo);
    } catch {
      // JSON inválido ou storage indisponível: usa o valor inicial.
    }
    return typeof inicial === "function" ? inicial() : inicial;
  });

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      // Cota excedida ou modo privado: mantém apenas em memória.
    }
  }, [chave, valor]);

  return [valor, setValor];
}
