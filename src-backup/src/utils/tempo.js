/** Formata um timestamp como tempo relativo curto ("5 min", "3 h", "2 d"). */
export function tempoRelativo(timestamp, agora) {
  const seg = Math.max(0, Math.floor((agora - timestamp) / 1000));
  if (seg < 60) return "agora";
  const min = Math.floor(seg / 60);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} d`;
  if (d < 30) return `${Math.floor(d / 7)} sem`;
  return `${Math.floor(d / 30)} m`;
}
