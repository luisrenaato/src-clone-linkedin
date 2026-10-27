// Todo o conteúdo abaixo é FICTÍCIO e serve apenas como demonstração.

export const PESSOAS = [
  { id: "p-marina", nome: "Marina Albuquerque", cargo: "Product Designer na Studio Aurora", cor: "#b24020" },
  { id: "p-rafael", nome: "Rafael Tavares", cargo: "Engenheiro de Software Sênior", cor: "#2f6f4f" },
  { id: "p-camila", nome: "Camila Duarte", cargo: "Analista de Dados", cor: "#7a3e9d" },
  { id: "p-lucas", nome: "Lucas Ferraz", cargo: "Recrutador de Tecnologia", cor: "#1f6f8b" },
  { id: "p-beatriz", nome: "Beatriz Nogueira", cargo: "Gerente de Produto", cor: "#a1593a" },
  { id: "p-thiago", nome: "Thiago Moreira", cargo: "Desenvolvedor Front-end", cor: "#3d5a99" },
  { id: "p-juliana", nome: "Juliana Prado", cargo: "Cientista de Dados", cor: "#8a6d1f" },
  { id: "p-andre", nome: "André Siqueira", cargo: "Fundador na Cerrado Labs", cor: "#5b5f66" },
];

export const DESCONHECIDO = { id: "?", nome: "Usuário removido", cargo: "", cor: "#8c8c8c" };

export const CONEXOES_INICIAIS = {
  "p-marina": "conectado",
  "p-rafael": "conectado",
  "p-camila": "conectado",
  "p-lucas": "conectado",
};

export const HASHTAGS = ["#design", "#react", "#dados", "#carreira", "#empreendedorismo"];

export const NOTICIAS = [
  { id: "n1", titulo: "Equipes adotam ferramentas de IA no dia a dia", meta: "há 2 h • 1.284 leitores" },
  { id: "n2", titulo: "Trabalho híbrido segue em alta entre empresas de tecnologia", meta: "há 5 h • 962 leitores" },
  { id: "n3", titulo: "Mercado de dados abre novas vagas para iniciantes", meta: "há 1 d • 845 leitores" },
  { id: "n4", titulo: "Design systems: por que consistência acelera produtos", meta: "há 1 d • 611 leitores" },
  { id: "n5", titulo: "Startups regionais ganham espaço no Centro-Oeste", meta: "há 2 d • 430 leitores" },
];

/** Posts iniciais, com horários relativos ao momento da primeira execução. */
export function criarPostsIniciais() {
  const agora = Date.now();
  const min = 60_000;
  const base = { curtidoPorMim: false, imagem: null, repostDeId: null };
  return [
    {
      ...base, id: "p1", autorId: "p-marina", criadoEm: agora - 25 * min,
      texto: "Hoje terminamos a revisão do nosso sistema de design. O que mais aprendi: consistência vale mais que novidade. Componentes pequenos, bem documentados, aceleram qualquer equipe. #design #produto",
      curtidas: 48, compartilhamentos: 3,
      comentarios: [
        { id: "c1", autorId: "p-rafael", criadoEm: agora - 12 * min, texto: "Concordo totalmente. Documentação é o que faz o sistema sobreviver." },
      ],
    },
    {
      ...base, id: "p2", autorId: "p-rafael", criadoEm: agora - 120 * min,
      texto: "Dica para quem está começando com React: antes de procurar uma biblioteca de estado, tente resolver com useState e useReducer. Na maioria dos casos, já basta. Qual decisão de arquitetura deixou você mais orgulhoso? #react #frontend",
      curtidas: 112, compartilhamentos: 9,
      comentarios: [
        { id: "c2", autorId: "p-thiago", criadoEm: agora - 90 * min, texto: "Separar estado de servidor do estado de interface me poupou muita dor de cabeça." },
        { id: "c3", autorId: "p-camila", criadoEm: agora - 60 * min, texto: "Ótima dica, vou aplicar no painel que estou montando." },
      ],
    },
    {
      ...base, id: "p3", autorId: "p-lucas", criadoEm: agora - 300 * min,
      texto: "Estamos com vagas abertas para desenvolvimento e dados em equipes remotas. Alguns conselhos de quem lê muitos currículos: seja específico sobre o impacto do seu trabalho, destaque projetos reais (mesmo pessoais) e mantenha o perfil atualizado. Um bom resumo de três linhas chama mais atenção que uma lista enorme de tecnologias. Se quiser trocar ideia sobre carreira, é só comentar por aqui. #carreira #vagas",
      curtidas: 230, compartilhamentos: 41, comentarios: [],
    },
    {
      ...base, id: "p4", autorId: "p-camila", criadoEm: agora - 1560 * min,
      texto: "Análise de dados não é só gráfico bonito: é saber qual pergunta fazer. Hoje revisei um painel com 30 indicadores e concluímos que só 4 importavam. #dados #analytics",
      curtidas: 67, compartilhamentos: 5, comentarios: [],
    },
    {
      ...base, id: "p5", autorId: "p-andre", criadoEm: agora - 3000 * min,
      texto: "Seis meses desde que fundamos a Cerrado Labs. Aprendizados: ouvir clientes cedo, errar rápido e cuidar bem do time. Obrigado a quem acreditou desde o começo! #empreendedorismo #carreira",
      curtidas: 154, compartilhamentos: 12, comentarios: [],
    },
  ];
}
