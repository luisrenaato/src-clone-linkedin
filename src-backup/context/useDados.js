import { useContext } from "react";
import { DadosContexto } from "./DadosContexto.js";

export function useDados() {
  const ctx = useContext(DadosContexto);
  if (!ctx) throw new Error("useDados deve ser usado dentro de <DadosProvider>.");
  return ctx;
}
