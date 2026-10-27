/** Minúsculas e sem acentos, para comparações de busca. */
export function normalizar(texto) {
  return texto.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function iniciais(nome) {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (!partes.length) return "?";
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}

/** Deriva um nome de exibição a partir do e-mail digitado no login demonstrativo. */
export function nomeDoIdentificador(identificador) {
  const base = identificador.includes("@") ? identificador.split("@")[0] : "";
  const partes = base.split(/[._-]+/).filter((p) => /^\p{L}/u.test(p));
  if (!partes.length) return "Usuário Demo";
  return partes.map((p) => p[0].toUpperCase() + p.slice(1)).join(" ");
}

export function novoId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}
