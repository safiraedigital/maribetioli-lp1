import { useEffect, useMemo, useState } from "react";
import mariProfileLockup from "../Mari Betioli perfil.png";

const APP_CONFIG = {
  expertName: "Mari Betioli",
  projectName: "O Poder do Parto",
  brandColor: "#702299"
};

const LEGACY_STORAGE_KEY = "mari-betioli-discovery-diagnostic-v1";
const PREVIOUS_CURRENT_DIAGNOSIS_KEY = "mari-betioli-current-diagnosis-v2";
const PREVIOUS_SAVED_DIAGNOSES_KEY = "mari-betioli-saved-diagnoses-v2";
const CURRENT_DIAGNOSIS_KEY = "currentDiagnosis";
const SAVED_DIAGNOSES_KEY = "savedDiagnoses";
const PROPOSAL_STORAGE_KEY = "proposalCommercialConfig";
const STORAGE_MIGRATION_KEY = "mari-betioli-storage-migration-v3";
const PUBLISHED_DIAGNOSIS_SEED_KEY = "mari-betioli-published-diagnosis-seeded-v1";
const PUBLISHED_DIAGNOSIS_ID = "published-mari-betioli-2026-06-01-1333";
const PUBLISHED_DIAGNOSIS_SAVED_AT = "2026-06-01T13:33:00-03:00";

const stages = [
  {
    id: "estrutura",
    number: "01",
    title: "Estrutura",
    eyebrow: "Operação atual",
    orientation: "Entender como o projeto funciona hoje por trás da entrega da especialista.",
    objective: "Validar o nível de centralização, apoio operacional e capacidade real de execução.",
    strategicSignals: [
      "Operação centralizada na especialista",
      "Ausência de time de marketing",
      "Ausência de comercial estruturado",
      "Dependência de terceiros pontuais",
      "Baixa clareza de processos internos",
      "Necessidade de organização operacional"
    ],
    validationTopics: [
      "Estrutura atual da operação",
      "Equipe e apoio operacional",
      "Centralização das atividades"
    ],
    supportQuestions: [
      "Existe alguém trabalhando no projeto?",
      "Quais atividades estão centralizadas na especialista?",
      "Existe suporte, comercial ou equipe de apoio?"
    ]
  },
  {
    id: "vendas",
    number: "02",
    title: "Vendas",
    eyebrow: "Fluxo comercial",
    orientation: "Mapear como as vendas acontecem no perpétuo e onde existe atrito na conversão.",
    objective: "Validar origem das vendas, acompanhamento dos números e dependência de interação manual.",
    strategicSignals: [
      "Vendas 100% orgânicas",
      "Baixa previsibilidade de vendas",
      "Conversão depende de interação direta",
      "Conversão passiva pela página",
      "Ausência de acompanhamento mensal",
      "Falta de clareza sobre origem das vendas",
      "Perpétuo rodando sem tráfego pago",
      "Potencial de otimização da conversão"
    ],
    validationTopics: [
      "Fluxo atual do perpétuo",
      "Média de vendas",
      "Origem das vendas",
      "Processo de conversão"
    ],
    supportQuestions: [
      "Como está o fluxo de vendas atual?",
      "Existe acompanhamento dos números?",
      "As vendas acontecem de forma passiva ou exigem interação?",
      "Qual a principal origem das vendas?"
    ]
  },
  {
    id: "base",
    number: "03",
    title: "Base de Alunas",
    eyebrow: "Ativos de relacionamento",
    orientation: "Avaliar o tamanho, qualidade e potencial da base já construída.",
    objective: "Validar se existe relacionamento pós-compra, segmentação e oportunidade de reativação.",
    strategicSignals: [
      "Base de alunas relevante",
      "Base pouco segmentada",
      "Relacionamento pós-compra inexistente",
      "Relacionamento pós-compra informal",
      "Potencial de ativação da base",
      "Potencial de pesquisa com alunas",
      "Possível janela de compra curta",
      "Potencial de comunidade"
    ],
    validationTopics: [
      "Total de alunas",
      "Alunas ativas",
      "Relacionamento pós-compra",
      "Potencial da base atual"
    ],
    supportQuestions: [
      "O número de +1.800 alunas continua próximo da realidade?",
      "Existe relacionamento após a compra?",
      "Existe comunidade ou acompanhamento?",
      "A base possui algum tipo de segmentação?"
    ]
  },
  {
    id: "pesquisa",
    number: "04",
    title: "Pesquisa e Comportamento",
    eyebrow: "Compradoras e jornada",
    orientation: "Investigar padrões de compra, objeções e comportamento das alunas ao longo da gestação.",
    objective: "Validar o que a base revela sobre motivação, timing, conteúdo e novas demandas.",
    strategicSignals: [
      "Ausência de pesquisa pós-compra",
      "Baixa clareza sobre ICP real",
      "Compra concentrada em fase específica da gestação",
      "Objeções ainda pouco mapeadas",
      "Motivos de compra pouco registrados",
      "Forte dor emocional no processo de compra",
      "Forte influência do estágio da gestação",
      "Potencial de segmentação por trimestre",
      "Potencial de novos produtos a partir da jornada"
    ],
    validationTopics: [
      "Pesquisas pós-compra",
      "Perfil das compradoras",
      "Motivos de compra",
      "Objeções recorrentes",
      "Jornada da gestação"
    ],
    supportQuestions: [
      "Existe algum tipo de pesquisa realizada com as alunas?",
      "Em qual fase da gestação normalmente acontece a compra?",
      "O que costuma levar uma mulher a comprar?",
      "O que normalmente impede a compra?",
      "Qual o perfil das alunas que mais compram?",
      "Existe algum padrão entre as compradoras?",
      "Quanto tempo costumam acompanhar a especialista antes da compra?",
      "Existem temas recorrentes após a compra?",
      "Existem demandas recorrentes após o parto?",
      "Quais conteúdos geram mais interesse ou conversão?"
    ]
  },
  {
    id: "produtos",
    number: "05",
    title: "Produtos",
    eyebrow: "Esteira e demanda",
    orientation: "Identificar produtos atuais, demandas recorrentes e oportunidades de expansão.",
    objective: "Validar quais ofertas fazem sentido a partir do que as alunas já pedem ou demonstram precisar.",
    strategicSignals: [
      "Produtos futuros ainda não priorizados",
      "Produto em desenvolvimento",
      "Demanda recorrente por novos temas",
      "Oportunidade de produto complementar",
      "Oportunidade de produto pós-parto",
      "Oportunidade de produto de amamentação",
      "Oportunidade de formação profissional",
      "Oportunidade de assessoria ou acompanhamento"
    ],
    validationTopics: [
      "Produtos em desenvolvimento",
      "Demandas recorrentes",
      "Oportunidades identificadas"
    ],
    supportQuestions: [
      "Existe algum produto atualmente em desenvolvimento?",
      "Existe alguma demanda recorrente das alunas?",
      "Existem produtos frequentemente solicitados?",
      "Existem temas que aparecem repetidamente nas conversas?"
    ]
  },
  {
    id: "prioridades",
    number: "06",
    title: "Prioridades",
    eyebrow: "Foco dos próximos meses",
    orientation: "Definir o que precisa ser priorizado para transformar diagnóstico em direção prática.",
    objective: "Validar desafios centrais, ajustes urgentes e objetivos de curto prazo.",
    strategicSignals: [
      "Prioridade em organizar operação",
      "Prioridade em aumentar vendas",
      "Prioridade em entender dados",
      "Prioridade em estruturar conteúdo",
      "Prioridade em validar novos produtos",
      "Prioridade em melhorar conversão",
      "Prioridade em criar previsibilidade",
      "Prioridade em retomar crescimento"
    ],
    validationTopics: [
      "Principais desafios",
      "Ajustes prioritários",
      "Objetivos de curto prazo"
    ],
    supportQuestions: [
      "Qual é hoje o principal desafio do projeto?",
      "O que precisa ser ajustado primeiro?",
      "Quais são os objetivos para os próximos meses?"
    ]
  }
];

const fieldConfig = [
  {
    key: "resposta",
    label: "Resposta",
    helper: "O que a Mari respondeu.",
    placeholder: "Registre a resposta principal da Mari com números, exemplos e contexto..."
  },
  {
    key: "observacoes",
    label: "Observações",
    helper: "Sinais, contexto e nuances da conversa.",
    placeholder: "Anote sinais, linguagem usada, nuances, pontos de atenção e contexto da conversa..."
  },
  {
    key: "insights",
    label: "Insights estratégicos",
    helper: "Sua leitura sobre o que aquilo indica.",
    placeholder: "Registre sua leitura consultiva, oportunidades percebidas e conexões entre respostas..."
  },
  {
    key: "hipoteses",
    label: "Hipóteses identificadas",
    helper: "Possíveis caminhos, riscos ou oportunidades para validar depois.",
    placeholder: "Liste hipóteses para validar, riscos, gargalos prováveis e caminhos de investigação..."
  }
];

const summaryBlocks = [
  {
    id: "information",
    title: "Principais informações coletadas",
    key: "resposta",
    marker: "Resumo",
    icon: "●",
    tone: "brand"
  },
  {
    id: "assets",
    title: "Ativos identificados",
    key: null,
    marker: "Ativo",
    icon: "◆",
    tone: "neutral"
  },
  {
    id: "attention",
    title: "Pontos de atenção",
    key: "observacoes",
    marker: "Atenção",
    icon: "⚠️",
    tone: "warning"
  },
  {
    id: "opportunities",
    title: "Oportunidades percebidas",
    key: "insights",
    marker: "Oportunidade",
    icon: "🚀",
    tone: "opportunity"
  },
  {
    id: "hypotheses",
    title: "Hipóteses estratégicas",
    key: "hipoteses",
    marker: "Hipótese",
    icon: "💡",
    tone: "insight"
  },
  {
    id: "nextSteps",
    title: "Próximos passos sugeridos",
    key: null,
    marker: "Próximo passo",
    icon: "→",
    tone: "brand"
  }
];

const diagnosticRules = [
  {
    section: "attention",
    requires: ["Operação centralizada na especialista", "Ausência de time de marketing"],
    text: "A operação aparenta estar centralizada na especialista, o que pode limitar consistência, execução e crescimento."
  },
  {
    section: "attention",
    requires: ["Vendas 100% orgânicas", "Perpétuo rodando sem tráfego pago", "Baixa previsibilidade de vendas"],
    text: "O perpétuo parece depender majoritariamente do orgânico, com baixa previsibilidade de aquisição e vendas."
  },
  {
    section: "attention",
    requires: ["Conversão depende de interação direta"],
    text: "A conversão pode estar dependente da presença ou interação direta da especialista."
  },
  {
    section: "opportunities",
    requires: ["Base de alunas relevante", "Potencial de ativação da base"],
    text: "Existe oportunidade de ativar a base atual para pesquisa, relacionamento, novos produtos ou ofertas complementares."
  },
  {
    section: "attention",
    requires: ["Ausência de pesquisa pós-compra", "Baixa clareza sobre ICP real"],
    text: "Ainda parece faltar uma leitura mais estruturada sobre o perfil real das compradoras e os motivos de compra."
  },
  {
    section: "opportunities",
    requires: ["Potencial de segmentação por trimestre", "Forte influência do estágio da gestação"],
    text: "Existe oportunidade de segmentar comunicação e oferta por fase da gestação."
  },
  {
    section: "opportunities",
    requires: ["Oportunidade de produto pós-parto", "Oportunidade de produto de amamentação"],
    text: "A jornada da mulher pode ser explorada além do parto, especialmente em temas como puerpério e amamentação."
  },
  {
    section: "opportunities",
    requires: ["Oportunidade de formação profissional"],
    text: "A autoridade da especialista pode abrir espaço para produtos voltados a profissionais, como formações ou especializações."
  },
  {
    section: "nextSteps",
    requires: ["Prioridade em entender dados"],
    text: "Organizar levantamento inicial de dados da operação, vendas, base e comportamento das alunas."
  },
  {
    section: "nextSteps",
    requires: ["Prioridade em melhorar conversão"],
    text: "Analisar página, VSL e fluxo de conversão para identificar ajustes de oferta, copy e experiência."
  },
  {
    section: "nextSteps",
    requires: ["Prioridade em validar novos produtos"],
    text: "Realizar pesquisa com alunas e audiência para priorizar produtos com base em demanda real."
  },
  {
    section: "assets",
    requires: ["Base de alunas relevante"],
    text: "A base de alunas aparece como ativo relevante para pesquisa, relacionamento e ofertas futuras."
  },
  {
    section: "assets",
    requires: ["Vendas 100% orgânicas"],
    text: "A existência de vendas orgânicas indica potencial de demanda e força de autoridade/audiência."
  },
  {
    section: "assets",
    requires: ["Conversão passiva pela página"],
    text: "A página já demonstra algum potencial de conversão passiva, que pode ser refinado e mensurado."
  },
  {
    section: "attention",
    requires: ["Ausência de comercial estruturado"],
    text: "O processo comercial ainda parece pouco estruturado, o que pode gerar perda de oportunidades e baixa cadência de conversão."
  },
  {
    section: "attention",
    requires: ["Base pouco segmentada"],
    text: "A base parece pouco segmentada, reduzindo a precisão de comunicação, ofertas e pesquisas."
  },
  {
    section: "opportunities",
    requires: ["Potencial de comunidade"],
    text: "Há oportunidade de transformar relacionamento com alunas em comunidade, acompanhamento ou recorrência."
  },
  {
    section: "hypotheses",
    requires: ["Possível janela de compra curta"],
    text: "A janela de compra pode ser curta e fortemente influenciada pelo momento da gestação."
  },
  {
    section: "hypotheses",
    requires: ["Demanda recorrente por novos temas"],
    text: "Demandas recorrentes podem indicar uma esteira de produtos complementar ao produto principal."
  },
  {
    section: "nextSteps",
    requires: ["Prioridade em organizar operação"],
    text: "Mapear responsabilidades, processos e apoios necessários para reduzir centralização operacional."
  },
  {
    section: "nextSteps",
    requires: ["Prioridade em criar previsibilidade"],
    text: "Desenhar um plano inicial de aquisição, nutrição e conversão para aumentar previsibilidade comercial."
  }
];

const salesByWhatsAppData = [
  { date: "2024-06", label: "Jun/24", value: 1 },
  { date: "2024-08", label: "Ago/24", value: 22 },
  { date: "2024-09", label: "Set/24", value: 7 },
  { date: "2024-10", label: "Out/24", value: 3 },
  { date: "2024-11", label: "Nov/24", value: 2 },
  { date: "2024-12", label: "Dez/24", value: 2 },
  { date: "2025-01", label: "Jan/25", value: 5 },
  { date: "2025-02", label: "Fev/25", value: 27 },
  { date: "2025-03", label: "Mar/25", value: 11 },
  { date: "2025-04", label: "Abr/25", value: 16 },
  { date: "2025-05", label: "Mai/25", value: 13 },
  { date: "2025-06", label: "Jun/25", value: 15 },
  { date: "2025-07", label: "Jul/25", value: 23 },
  { date: "2025-08", label: "Ago/25", value: 43 },
  { date: "2025-09", label: "Set/25", value: 25 },
  { date: "2025-10", label: "Out/25", value: 12 },
  { date: "2025-11", label: "Nov/25", value: 32 },
  { date: "2025-12", label: "Dez/25", value: 20 },
  { date: "2026-01", label: "Jan/26", value: 28 },
  { date: "2026-02", label: "Fev/26", value: 7 },
  { date: "2026-03", label: "Mar/26", value: 7 },
  { date: "2026-04", label: "Abr/26", value: 5 },
  { date: "2026-05", label: "Mai/26", value: 7 }
];

const salesHighlights = [
  { label: "Período", value: "Jun/24 a Mai/26" },
  { label: "Vendas", value: "293 vendas" },
  { label: "Pico absoluto", value: "Agosto de 2025 · 43 vendas" }
];

const proposalWorkBlocks = [
  {
    key: "strategy",
    title: "Estratégia"
  },
  {
    key: "structure",
    title: "Estrutura"
  },
  {
    key: "acquisition",
    title: "Aquisição e conversão"
  },
  {
    key: "expansion",
    title: "LTV e expansão"
  }
];

const proposalTimeline = [
  {
    phase: "Mapeamento estratégico",
    objective: "Compreender como o negócio opera hoje e quais elementos precisam estar presentes para que a expansão aconteça.",
    deliveries: [
      "Análise do modelo de negócio e dos indicadores críticos",
      "Revisão de funis, canais, comportamento de cliente e histórico de resultados",
      "Identificação das oportunidades de melhoria e das ineficiências estruturais",
      "Definição dos pilares que irão orientar o planejamento"
    ],
    deadline: "2 semanas"
  },
  {
    phase: "Planejamento e decisões estruturais",
    objective: "Transformar o diagnóstico em direção clara e priorizada, definindo o que irá guiar o crescimento no próximo ciclo.",
    deliveries: [
      "Priorização das frentes estratégicas",
      "Metas e direcionadores definidos",
      "Organização das decisões no F.O.E. Framework",
      "Direção para funis de vendas, oferta e aquisição"
    ],
    deadline: "2 semanas"
  },
  {
    phase: "Plano de implementação e acompanhamento inicial",
    objective: "Organizar a execução para que o crescimento saia do papel com clareza, ritmo e coerência operacional.",
    deliveries: [
      "Plano de implementação com etapas, responsáveis e prazos",
      "Padrões e recomendações essenciais para garantir alinhamento entre estratégia e execução",
      "Acompanhamento inicial das primeiras ações para validar aderência ao direcionamento definido"
    ],
    deadline: "3 a 4 semanas"
  }
];

const DEFAULT_PROPOSAL_TEXTS = {
  strategy:
    "Definição de direcionamentos estratégicos, priorização de iniciativas, evolução da oferta atual, construção da arquitetura de crescimento e acompanhamento dos principais indicadores do projeto.",
  structure:
    "Implementação e organização da camada operacional do projeto, incluindo CRM, tracking, automações, processos comerciais, coleta de dados e acompanhamento de métricas.",
  acquisition:
    "Evolução dos mecanismos de aquisição e conversão por meio de Conteúdo Guiado, otimização do perpétuo, fortalecimento do relacionamento com a audiência e Social Selling (mediante aprovação da especialista).",
  expansion:
    "Pesquisa com compradoras, aprofundamento do ICP, identificação de novas oportunidades de monetização, desenvolvimento de ofertas complementares e estratégias de retenção ao longo da jornada das alunas.",
  responsibilities:
    "Amanda & Robson: Responsáveis pela frente estratégica, estruturação da operação, implementação de melhorias, acompanhamento de indicadores, condução das iniciativas de crescimento e suporte à tomada de decisão do projeto.\n\nMari Betioli: Responsável pela autoridade técnica do projeto, validação das estratégias propostas, produção de conteúdo, participação em decisões-chave e alinhamentos necessários para execução das iniciativas.",
  observations:
    "A execução das iniciativas seguirá uma ordem de priorização definida em conjunto entre as partes, respeitando a capacidade operacional, disponibilidade de recursos e estágio de maturidade do projeto.",
  conditions:
    "O percentual de participação contempla atuação contínua nas frentes de estratégia, estrutura, crescimento e expansão do projeto. Investimentos, ferramentas, fornecedores externos e demais custos operacionais serão alinhados previamente entre as partes antes de sua contratação ou implementação."
};

const PREVIOUS_PROPOSAL_TEXTS = {
  strategy:
    "Construir uma arquitetura de crescimento com prioridades claras, refinamento dos ativos comerciais e organização das decisões estratégicas do projeto.",
  structure:
    "Estruturar a base operacional necessária para acompanhamento, leitura de dados, automações, CRM e organização dos principais ativos digitais.",
  acquisition:
    "Evoluir os mecanismos de aquisição e conversão por meio de Conteúdo Guiado, processos de relacionamento e Social Selling mediante aprovação da especialista.",
  expansion:
    "Aprofundar a compreensão da base de alunas, identificar oportunidades ao longo da jornada e desenvolver novas ofertas com potencial de expansão de LTV.",
  responsibilities:
    "Amanda & Robson: estratégia, estruturação, acompanhamento comercial, organização dos ativos digitais, leitura de dados e condução das frentes de crescimento.\n\nMari Betioli: validação estratégica, aprovação de diretrizes, participação em decisões-chave, produção de conteúdos sensíveis à autoridade técnica e disponibilidade para alinhamentos definidos entre as partes.",
  conditions:
    "Os percentuais finais, responsabilidades específicas, investimentos e condições operacionais serão formalizados após alinhamento entre as partes."
};

const signalProposalLanguage = {
  "Operação centralizada na especialista": "evolução da governança operacional",
  "Ausência de time de marketing": "estruturação de apoio estratégico de marketing",
  "Ausência de comercial estruturado": "evolução dos processos de conversão",
  "Dependência de terceiros pontuais": "organização dos papéis e fluxos de execução",
  "Baixa clareza de processos internos": "clareza de processos e rituais de acompanhamento",
  "Necessidade de organização operacional": "estruturação da rotina operacional",
  "Vendas 100% orgânicas": "fortalecimento dos canais orgânicos já validados",
  "Baixa previsibilidade de vendas": "construção de previsibilidade comercial",
  "Conversão depende de interação direta": "evolução dos processos de relacionamento e conversão",
  "Conversão passiva pela página": "otimização dos ativos de conversão existentes",
  "Ausência de acompanhamento mensal": "estruturação da camada de indicadores e acompanhamento",
  "Falta de clareza sobre origem das vendas": "estruturação da camada de dados comerciais",
  "Perpétuo rodando sem tráfego pago": "ampliação gradual dos canais de aquisição validados",
  "Potencial de otimização da conversão": "refinamento dos mecanismos de conversão",
  "Base de alunas relevante": "ativação estratégica da base de alunas",
  "Base pouco segmentada": "segmentação da base por perfil, momento e intenção",
  "Relacionamento pós-compra inexistente": "construção de relacionamento pós-compra",
  "Relacionamento pós-compra informal": "evolução do relacionamento pós-compra",
  "Potencial de ativação da base": "reativação e nutrição da base atual",
  "Potencial de pesquisa com alunas": "pesquisa com compradoras e alunas",
  "Possível janela de compra curta": "comunicação alinhada ao momento da jornada",
  "Potencial de comunidade": "fortalecimento de comunidade e pertencimento",
  "Ausência de pesquisa pós-compra": "implantação de pesquisa pós-compra",
  "Baixa clareza sobre ICP real": "aprofundamento do perfil das compradoras",
  "Compra concentrada em fase específica da gestação": "segmentação por etapa da gestação",
  "Objeções ainda pouco mapeadas": "mapeamento consultivo de objeções",
  "Motivos de compra pouco registrados": "organização dos motivos de compra",
  "Forte dor emocional no processo de compra": "comunicação sensível aos motivadores emocionais",
  "Forte influência do estágio da gestação": "jornada de comunicação por fase da gestação",
  "Potencial de segmentação por trimestre": "segmentação por trimestre gestacional",
  "Potencial de novos produtos a partir da jornada": "desenvolvimento de novas oportunidades de oferta",
  "Produtos futuros ainda não priorizados": "priorização de esteira de produtos",
  "Produto em desenvolvimento": "organização da próxima oferta",
  "Demanda recorrente por novos temas": "desenvolvimento de ofertas a partir de demanda validada",
  "Oportunidade de produto complementar": "expansão de produto complementar",
  "Oportunidade de produto pós-parto": "expansão para a jornada pós-parto",
  "Oportunidade de produto de amamentação": "estruturação de oferta sobre amamentação",
  "Oportunidade de formação profissional": "avaliação de oferta para profissionais",
  "Oportunidade de assessoria ou acompanhamento": "avaliação de acompanhamento ou assessoria",
  "Prioridade em organizar operação": "estruturação operacional",
  "Prioridade em aumentar vendas": "crescimento comercial",
  "Prioridade em entender dados": "decisões orientadas por dados",
  "Prioridade em estruturar conteúdo": "organização estratégica de conteúdo",
  "Prioridade em validar novos produtos": "validação de novas ofertas",
  "Prioridade em melhorar conversão": "otimização de conversão",
  "Prioridade em criar previsibilidade": "previsibilidade de receita",
  "Prioridade em retomar crescimento": "retomada de crescimento sustentável"
};

function normalizeStageData(stageData = {}, allowedSignals = []) {
  const normalized = fieldConfig.reduce((fields, field) => {
    fields[field.key] = typeof stageData[field.key] === "string" ? stageData[field.key] : "";
    return fields;
  }, {});

  const savedSignals = Array.isArray(stageData.signals) ? stageData.signals : [];
  normalized.signals = allowedSignals.length
    ? savedSignals.filter((signal) => allowedSignals.includes(signal))
    : savedSignals;
  return normalized;
}

function createInitialData() {
  return stages.reduce((acc, stage) => {
    acc[stage.id] = normalizeStageData({}, stage.strategicSignals);
    return acc;
  }, {});
}

function mergeSavedData(savedData) {
  return stages.reduce((acc, stage) => {
    acc[stage.id] = normalizeStageData(savedData?.[stage.id], stage.strategicSignals);
    return acc;
  }, {});
}

function safeReadJson(key, fallback) {
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function loadCurrentDiagnosis() {
  const current = safeReadJson(CURRENT_DIAGNOSIS_KEY, null);
  const currentData = current ? mergeSavedData(current) : null;

  if (currentData && hasDiagnosisData(currentData)) {
    return currentData;
  }

  const previous = safeReadJson(PREVIOUS_CURRENT_DIAGNOSIS_KEY, null);
  const previousData = previous ? mergeSavedData(previous) : null;

  if (previousData && hasDiagnosisData(previousData)) {
    return previousData;
  }

  const legacy = safeReadJson(LEGACY_STORAGE_KEY, null);
  const legacyData = legacy ? mergeSavedData(legacy) : null;

  if (legacyData && hasDiagnosisData(legacyData)) {
    return legacyData;
  }

  if (current) {
    return currentData;
  }

  return createInitialData();
}

function hasPreviousCurrentDiagnosisData() {
  const previous = safeReadJson(PREVIOUS_CURRENT_DIAGNOSIS_KEY, null);
  return previous ? hasDiagnosisData(mergeSavedData(previous)) : false;
}

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `diagnosis-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDateTime(dateValue = new Date()) {
  const date = new Date(dateValue);
  const pad = (value) => String(value).padStart(2, "0");

  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

function createDiagnosisName(dateValue = new Date()) {
  return `Diagnóstico ${APP_CONFIG.expertName} — ${formatDateTime(dateValue)}`;
}

function snapshotDiagnosis(data) {
  return JSON.stringify(mergeSavedData(data));
}

function hasDiagnosisData(data) {
  return stages.some((stage) => {
    const stageData = data[stage.id] || {};
    const hasText = fieldConfig.some((field) => stageData[field.key]?.trim());
    const hasSignals = Array.isArray(stageData.signals) && stageData.signals.length > 0;
    return hasText || hasSignals;
  });
}

function getProposalOpportunities(data) {
  const mappedSignals = getSelectedSignals(data)
    .map(({ signal }) => signalProposalLanguage[signal])
    .filter(Boolean);
  const uniqueSignals = Array.from(new Set(mappedSignals));

  if (uniqueSignals.length) {
    return uniqueSignals.slice(0, 8);
  }

  return [
    "estruturação da camada comercial",
    "organização dos ativos digitais",
    "evolução dos processos de relacionamento",
    "desenvolvimento de novas oportunidades de monetização"
  ];
}

function buildProposalFields(data, previous = {}) {
  const normalizedPrevious = normalizeProposalFields(previous);
  const opportunities = getProposalOpportunities(data);
  const formattedOpportunities = opportunities.map((item) => item.toLowerCase());

  const visionText = `Acreditamos que o projeto ${APP_CONFIG.projectName} possui potencial para crescimento sustentável por meio da evolução da estrutura comercial, dos processos de relacionamento e da construção de novas oportunidades de monetização ao longo da jornada das alunas.

A partir da leitura estratégica realizada, enxergamos um caminho de parceria voltado para ${formattedOpportunities
    .slice(0, 4)
    .join(", ")}. A proposta é organizar as próximas etapas com clareza, priorização e acompanhamento, preservando a autoridade da especialista e ampliando a capacidade de crescimento do projeto.`;

  return {
    vision: visionText,
    strategy: normalizedPrevious.strategy || DEFAULT_PROPOSAL_TEXTS.strategy,
    structure: normalizedPrevious.structure || DEFAULT_PROPOSAL_TEXTS.structure,
    acquisition: normalizedPrevious.acquisition || DEFAULT_PROPOSAL_TEXTS.acquisition,
    expansion: normalizedPrevious.expansion || DEFAULT_PROPOSAL_TEXTS.expansion,
    specialistPercentage: normalizedPrevious.specialistPercentage || "",
    partnershipPercentage: normalizedPrevious.partnershipPercentage || "",
    responsibilities:
      normalizedPrevious.responsibilities || DEFAULT_PROPOSAL_TEXTS.responsibilities,
    observations: normalizedPrevious.observations || DEFAULT_PROPOSAL_TEXTS.observations,
    conditions: normalizedPrevious.conditions || DEFAULT_PROPOSAL_TEXTS.conditions
  };
}

function normalizeProposalFields(proposal) {
  if (!proposal) {
    return null;
  }

  const normalized = {
    ...proposal,
    vision: (proposal.vision || "").replaceAll(
      "projeto Poder do Parto",
      `projeto ${APP_CONFIG.projectName}`
    ),
    responsibilities: (proposal.responsibilities || "")
      .replaceAll("Safira & Digital:", "Amanda & Robson:")
      .replaceAll("Especialista:", "Mari Betioli:")
  };

  Object.entries(PREVIOUS_PROPOSAL_TEXTS).forEach(([key, previousText]) => {
    if (normalized[key] === previousText) {
      normalized[key] = DEFAULT_PROPOSAL_TEXTS[key];
    }
  });

  if (!normalized.observations) {
    normalized.observations = DEFAULT_PROPOSAL_TEXTS.observations;
  }

  return normalized;
}

function getStageFromHash() {
  const hash = window.location.hash.replace("#", "");
  const validIds = new Set([...stages.map((stage) => stage.id), "resumo", "proposta"]);
  return validIds.has(hash) ? hash : stages[0].id;
}

function createSavedDiagnosis(data, overrides = {}) {
  const savedAt = overrides.savedAt || new Date().toISOString();
  const normalizedData = mergeSavedData(data);

  return {
    id: overrides.id || createId(),
    name: overrides.name || createDiagnosisName(savedAt),
    savedAt,
    updatedAt: overrides.updatedAt || savedAt,
    data: normalizedData,
    summary: formatSummary(normalizedData)
  };
}

function loadSavedDiagnoses() {
  const saved = safeReadJson(SAVED_DIAGNOSES_KEY, null);
  const previousSaved = safeReadJson(PREVIOUS_SAVED_DIAGNOSES_KEY, []);
  const source = Array.isArray(saved) ? saved : previousSaved;

  if (!Array.isArray(source)) {
    return [];
  }

  return source
    .filter((diagnosis) => diagnosis?.data)
    .map((diagnosis) =>
      createSavedDiagnosis(diagnosis.data, {
        id: diagnosis.id,
        name: diagnosis.name,
        savedAt: diagnosis.savedAt,
        updatedAt: diagnosis.updatedAt
      })
    )
    .sort((first, second) => new Date(second.savedAt) - new Date(first.savedAt));
}

function getFilledFields(stageData) {
  return fieldConfig.filter((field) => stageData?.[field.key]?.trim().length > 0).length;
}

function getSelectedSignals(data) {
  return stages.flatMap((stage) => {
    const signals = Array.isArray(data[stage.id]?.signals) ? data[stage.id].signals : [];

    return signals.map((signal) => ({
      stage: stage.title,
      signal
    }));
  });
}

function buildExecutiveSummary(data) {
  const selectedSignals = getSelectedSignals(data);
  const signalSet = new Set(selectedSignals.map(({ signal }) => signal));
  const generatedEntries = diagnosticRules
    .filter((rule) => rule.requires.every((signal) => signalSet.has(signal)))
    .map((rule) => ({
      section: rule.section,
      stage: "Leitura automática",
      text: rule.text,
      generated: true
    }));

  return summaryBlocks.map((block) => {
    const fieldEntries = block.key
      ? stages
          .map((stage) => ({
            stage: stage.title,
            text: data[stage.id]?.[block.key]?.trim() || "",
            generated: false
          }))
          .filter((entry) => entry.text)
      : [];

    return {
      ...block,
      entries: [
        ...generatedEntries.filter((entry) => entry.section === block.id),
        ...fieldEntries
      ]
    };
  });
}

function formatSummary(data) {
  const executiveSummary = buildExecutiveSummary(data);
  const lines = [
    `Diagnóstico Estratégico - ${APP_CONFIG.expertName}`,
    `Gerado em ${new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })}`,
    ""
  ];

  stages.forEach((stage) => {
    const stageData = data[stage.id] || {};
    lines.push(`${stage.number}. ${stage.title.toUpperCase()}`);
    fieldConfig.forEach((field) => {
      const value = stageData[field.key]?.trim();
      if (value) {
        lines.push(`${field.label}: ${value}`);
      }
    });
    if (stageData.signals?.length) {
      lines.push("Sinais estratégicos:");
      stageData.signals.forEach((signal) => lines.push(`- ${signal}`));
    }
    lines.push("");
  });

  lines.push("SÍNTESE CONSULTIVA");
  executiveSummary.forEach(({ title, entries }) => {
    lines.push(title);
    lines.push(
      entries.length
        ? entries.map((entry) => `- ${entry.stage}: ${entry.text}`).join("\n")
        : "- Ainda sem registros suficientes."
    );
    lines.push("");
  });

  return lines.join("\n");
}

function Field({ field, value, onChange }) {
  return (
    <label className="flex min-h-[260px] flex-col rounded-lg border border-slate-200 bg-white shadow-panel">
      <span className="border-b border-slate-100 px-4 py-3">
        <span className="block text-xs font-bold uppercase text-slate-500">{field.label}</span>
        <span className="mt-1 block text-sm leading-5 text-slate-500">{field.helper}</span>
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(field.key, event.target.value)}
        placeholder={field.placeholder}
        className="min-h-[190px] flex-1 resize-y rounded-b-lg border-0 bg-white px-4 py-4 text-[15px] leading-7 text-slate-800 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-brand/25"
      />
    </label>
  );
}

function FlowCard({ title, eyebrow, children, tone = "light" }) {
  return (
    <section
      className={`h-full rounded-lg border p-4 shadow-panel ${
        tone === "brand"
          ? "border-brand bg-brand text-white shadow-brand"
          : "border-slate-200 bg-white text-slate-800"
      }`}
    >
      {eyebrow ? (
        <p className={tone === "brand" ? "text-xs font-bold uppercase text-white/65" : "text-xs font-bold uppercase text-slate-400"}>
          {eyebrow}
        </p>
      ) : null}
      <h3 className={tone === "brand" ? "mt-1 text-lg font-semibold text-white" : "mt-1 text-lg font-semibold text-slate-950"}>
        {title}
      </h3>
      {children}
    </section>
  );
}

function InsightList({ title, items, tone = "light" }) {
  return (
    <FlowCard title={title} eyebrow={tone === "brand" ? "Validação" : "Roteiro"} tone={tone}>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <div
            key={item}
            className={`rounded-md border px-3 py-2 text-sm leading-6 ${
              tone === "brand"
                ? "border-white/15 bg-white/12 text-white"
                : "border-slate-200 bg-slate-50 text-slate-700"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </FlowCard>
  );
}

function StrategicSignals({ stage, selectedSignals, onChange }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-brand">Sinais estratégicos</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-950">
            Marque os sinais percebidos na conversa
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Esses sinais alimentam automaticamente a síntese consultiva final.
          </p>
        </div>
        <span className="w-fit rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          {selectedSignals.length}/{stage.strategicSignals.length} marcados
        </span>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {stage.strategicSignals.map((signal) => {
          const checked = selectedSignals.includes(signal);

          return (
            <label
              key={signal}
              className={`flex cursor-pointer items-start gap-3 rounded-md border px-3 py-2 transition ${
                checked
                  ? "border-brand/30 bg-brand-soft text-brand-deep"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-brand/20 hover:bg-white"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(signal, event.target.checked)}
                className="mt-1 h-4 w-4 accent-brand"
              />
              <span className="text-sm leading-6">{signal}</span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

function SalesPerformance() {
  const chartWidth = 720;
  const chartHeight = 224;
  const padding = { top: 26, right: 22, bottom: 34, left: 46 };
  const maxValue = 45;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const points = salesByWhatsAppData.map((item, index) => {
    const x = padding.left + (index / (salesByWhatsAppData.length - 1)) * plotWidth;
    const y = padding.top + (1 - item.value / maxValue) * plotHeight;

    return { ...item, x, y };
  });
  const path = points.map((point) => `${point.x},${point.y}`).join(" ");
  const peak = points.reduce((highest, point) => (point.value > highest.value ? point : highest), points[0]);
  const activePoint = hoveredIndex === null ? peak : points[hoveredIndex];
  const yearTicks = Array.from(
    points
      .reduce((ticks, point) => {
        const year = point.date.slice(0, 4);
        return ticks.has(year) ? ticks : ticks.set(year, point);
      }, new Map())
      .entries()
  ).map(([year, point]) => ({ year, x: point.x }));
  const tooltipWidth = 166;
  const tooltipX = Math.min(
    Math.max(activePoint.x - tooltipWidth / 2, padding.left),
    chartWidth - padding.right - tooltipWidth
  );
  const tooltipY = Math.max(activePoint.y - 44, 8);
  const activeLabel = `${activePoint.label} · ${activePoint.value} ${
    activePoint.value === 1 ? "venda" : "vendas"
  }`;

  return (
    <section className="print-chart print-avoid-break rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
      <div className="flex flex-col gap-2 border-l-4 border-brand pl-4">
        <p className="text-xs font-bold uppercase text-brand">Vendas por WhatsApp</p>
        <h3 className="text-2xl font-semibold text-slate-950">Evolução mensal de vendas</h3>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          Série informada após a chamada para apoiar a leitura de previsibilidade,
          sazonalidade e oportunidades de conversão.
        </p>
      </div>

      <div className="mt-5 grid items-start gap-5 xl:grid-cols-[1.55fr_0.75fr]">
        <div className="rounded-lg border border-brand/10 bg-brand-soft/45 p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            role="img"
            aria-label="Gráfico de vendas mensais por WhatsApp"
            className="block w-full"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {[0, 10, 20, 30, 40].map((tick) => {
              const y = padding.top + (1 - tick / maxValue) * plotHeight;

              return (
                <g key={tick}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={chartWidth - padding.right}
                    y2={y}
                    stroke="#E5D7EE"
                    strokeWidth="1"
                  />
                  <text x={padding.left - 12} y={y + 4} textAnchor="end" fontSize="12" fill="#64748B">
                    {tick}
                  </text>
                </g>
              );
            })}

            <line
              x1={padding.left}
              y1={chartHeight - padding.bottom}
              x2={chartWidth - padding.right}
              y2={chartHeight - padding.bottom}
              stroke="#BFA7CE"
              strokeWidth="1.25"
            />
            <line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={chartHeight - padding.bottom}
              stroke="#BFA7CE"
              strokeWidth="1.25"
            />

            <polyline
              fill="none"
              points={path}
              stroke={APP_CONFIG.brandColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.75"
            />

            {points.map((point, index) => (
              <g key={point.date}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={point.date === activePoint.date ? 5.5 : 3.8}
                  fill={point.date === activePoint.date ? "#4E176F" : APP_CONFIG.brandColor}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="12"
                  fill="transparent"
                  className="cursor-pointer"
                  tabIndex={0}
                  aria-label={`${point.label}: ${point.value} ${
                    point.value === 1 ? "venda" : "vendas"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                />
              </g>
            ))}

            {yearTicks.map((tick) => (
              <g key={tick.year}>
                <line
                  x1={tick.x}
                  y1={chartHeight - padding.bottom}
                  x2={tick.x}
                  y2={chartHeight - padding.bottom + 5}
                  stroke="#BFA7CE"
                  strokeWidth="1.25"
                />
                <text
                  x={tick.x}
                  y={chartHeight - padding.bottom + 23}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="#475569"
                >
                  {tick.year}
                </text>
              </g>
            ))}

            <g transform={`translate(${tooltipX} ${tooltipY})`} pointerEvents="none">
              <rect width={tooltipWidth} height="30" rx="8" fill="#4E176F" />
              <text
                x={tooltipWidth / 2}
                y="19"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#FFFFFF"
              >
                {activeLabel}
              </text>
            </g>
          </svg>
        </div>

        <div className="grid content-start gap-3">
          {salesHighlights.map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
              <p className="text-xs font-bold uppercase text-slate-400">{item.label}</p>
              <p className="mt-2 text-xl font-semibold leading-tight text-brand">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-brand/15 bg-brand-soft p-4">
        <p className="text-xs font-bold uppercase text-brand">Leitura rápida</p>
        <p className="mt-2 text-sm leading-7 text-brand-deep">
          A série mostra picos pontuais fortes e queda no volume recente, sugerindo oportunidade
          de investigar origem dos picos, cadência comercial e previsibilidade do perpétuo.
        </p>
      </div>
    </section>
  );
}

const summaryToneClasses = {
  brand: "border-brand/20 bg-brand-soft text-brand",
  neutral: "border-slate-200 bg-slate-50 text-slate-600",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  opportunity: "border-emerald-200 bg-emerald-50 text-emerald-800",
  insight: "border-violet-200 bg-violet-50 text-violet-800"
};

function SummarySection({ title, entries, marker, icon, tone }) {
  const [firstEntry, ...remainingEntries] = entries;

  const renderEntry = (entry) => (
    <article
      key={`${entry.stage}-${entry.text}`}
      className={`print-entry print-avoid-break rounded-md border px-4 py-3 ${
        entry.generated
          ? "border-brand/15 bg-brand-soft/70"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <p className="text-xs font-bold uppercase text-slate-400">
        {entry.generated ? "Leitura consultiva" : entry.stage}
      </p>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-slate-700">{entry.text}</p>
    </article>
  );

  return (
    <section className="print-card rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
      <div className={firstEntry ? "print-heading-group" : ""}>
        <div className="print-section-heading flex items-center gap-3">
          <span
            className={`grid h-9 w-9 place-items-center rounded-md border text-sm font-bold ${
              summaryToneClasses[tone] || summaryToneClasses.neutral
            }`}
          >
            {icon}
          </span>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">{marker}</p>
            <h3 className="text-sm font-bold uppercase text-brand">{title}</h3>
          </div>
        </div>
        {firstEntry ? <div className="mt-5">{renderEntry(firstEntry)}</div> : null}
      </div>
      {entries.length ? (
        <div className="mt-3 grid gap-3">
          {remainingEntries.map((entry) => renderEntry(entry))}
        </div>
      ) : (
        <div className="print-heading-group">
          <p className="mt-4 rounded-md border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
            Ainda sem registros suficientes.
          </p>
        </div>
      )}
    </section>
  );
}

function StageReportCard({ stage, stageData }) {
  const hasContent =
    fieldConfig.some((field) => stageData[field.key]?.trim()) || stageData.signals?.length > 0;
  const canBreakInPrint = stage.id === "pesquisa";

  return (
    <article
      className={`print-stage-card rounded-lg border border-slate-200 bg-white p-5 shadow-panel ${
        canBreakInPrint ? "print-long-stage" : ""
      }`}
    >
      <div className="print-stage-header flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-brand">Etapa {stage.number}</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-950">{stage.title}</h3>
        </div>
        <span className="w-fit rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          {stage.eyebrow}
        </span>
      </div>

      {hasContent ? (
        <div className="print-stack mt-5 grid gap-4 lg:grid-cols-2">
          {fieldConfig.map((field) => {
            const value = stageData[field.key]?.trim();

            return (
              <section
                key={field.key}
                className={`print-entry rounded-md border border-slate-200 bg-slate-50 p-4 ${
                  canBreakInPrint ? "" : "print-avoid-break"
                }`}
              >
                <p className="text-xs font-bold uppercase text-slate-500">{field.label}</p>
                {value ? (
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">{value}</p>
                ) : (
                  <p className="mt-2 text-sm leading-7 text-slate-400">Sem registro nesta seção.</p>
                )}
              </section>
            );
          })}
          {stageData.signals?.length ? (
            <section
              className={`print-entry rounded-md border border-brand/15 bg-brand-soft/60 p-4 lg:col-span-2 ${
                canBreakInPrint ? "" : "print-avoid-break"
              }`}
            >
              <p className="text-xs font-bold uppercase text-brand">Sinais estratégicos marcados</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {stageData.signals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-brand/20 bg-white px-3 py-1 text-xs font-bold text-brand"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      ) : (
        <p className="mt-5 rounded-md border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
          Esta etapa ainda não possui registros.
        </p>
      )}
    </article>
  );
}

function SavedDiagnosesPanel({ diagnoses, onOpen, onEdit, onDelete, onDuplicate }) {
  return (
    <section className="no-print rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
      <div className="flex flex-col gap-2 border-l-4 border-brand pl-4">
        <p className="text-xs font-bold uppercase text-brand">Diagnósticos salvos</p>
        <h3 className="text-2xl font-semibold text-slate-950">Histórico de diagnósticos</h3>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          Use Abrir para carregar o relatório salvo no resumo ou Editar para retomar o preenchimento.
        </p>
      </div>

      {diagnoses.length ? (
        <div className="mt-5 grid gap-3">
          {diagnoses.map((diagnosis) => (
            <article
              key={diagnosis.id}
              className="flex flex-col gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <h4 className="text-base font-semibold text-slate-950">{diagnosis.name}</h4>
                <p className="mt-1 text-sm text-slate-500">
                  Salvo em {formatDateTime(diagnosis.savedAt)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onOpen(diagnosis)}
                  className="rounded-md bg-brand px-3 py-2 text-sm font-bold text-white shadow-brand hover:bg-brand-deep"
                >
                  Abrir
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(diagnosis)}
                  className="rounded-md border border-brand/20 bg-white px-3 py-2 text-sm font-bold text-brand hover:bg-brand-soft"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onDuplicate(diagnosis)}
                  className="rounded-md border border-brand/20 bg-white px-3 py-2 text-sm font-bold text-brand hover:bg-brand-soft"
                >
                  Duplicar
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(diagnosis)}
                  className="rounded-md border border-rose-200 bg-white px-3 py-2 text-sm font-bold text-rose-700 hover:bg-rose-50"
                >
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-5 rounded-md border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
          Nenhum diagnóstico salvo ainda.
        </p>
      )}
    </section>
  );
}

function EmptySummaryState({ savedCount }) {
  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center shadow-panel">
      <p className="text-xs font-bold uppercase text-brand">Nenhum diagnóstico aberto</p>
      <h3 className="mt-2 text-2xl font-semibold text-slate-950">
        O resumo atual está limpo
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
        Para visualizar um relatório já salvo, use o botão Abrir no histórico de diagnósticos.
        Para começar uma nova reunião, preencha as etapas pelo menu.
      </p>
      {savedCount ? (
        <p className="mt-4 text-sm font-semibold text-brand">
          {savedCount} diagnóstico{savedCount === 1 ? "" : "s"} salvo{savedCount === 1 ? "" : "s"}{" "}
          {savedCount === 1 ? "disponível" : "disponíveis"} no histórico.
        </p>
      ) : null}
    </section>
  );
}

function ProposalTextarea({ label, value, onChange, rows = 5 }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase text-slate-500">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="proposal-edit-field mt-2 w-full resize-y rounded-md border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
      />
      <p className="proposal-print-value mt-2 hidden whitespace-pre-wrap rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700">
        {value || "A definir."}
      </p>
    </label>
  );
}

function ProposalPage({ number, eyebrow, title, children, cover = false }) {
  return (
    <section
      className={`proposal-page relative overflow-hidden rounded-lg border border-slate-200 bg-white p-8 shadow-panel md:p-10 ${
        cover ? "proposal-cover" : ""
      }`}
    >
      <div className="absolute inset-y-0 left-0 w-3 bg-brand/80" />
      <div className={cover ? "min-h-[430px] content-center pl-4" : "pl-4"}>
        <div className="flex items-start justify-between gap-4">
          <div className={cover ? "max-w-4xl" : ""}>
            {eyebrow ? (
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
            ) : null}
            {title ? (
              <h3
                className={`${
                  cover ? "mt-5 text-5xl md:text-7xl" : "mt-2 text-3xl md:text-4xl"
                } font-semibold leading-tight text-slate-950`}
              >
                {title}
              </h3>
            ) : null}
          </div>
          {number ? (
            <span className="rounded-full border border-brand/25 bg-white px-4 py-2 text-xs font-bold text-brand">
              {number}
            </span>
          ) : null}
        </div>
        <div className={cover ? "mt-8" : title ? "mt-7" : "mt-4"}>{children}</div>
      </div>
    </section>
  );
}

function ProposalResponsibilities({ value }) {
  const lines = (value || "A definir.").split("\n");

  return (
    <div className="mt-4 grid gap-2 whitespace-pre-wrap text-base leading-7 text-slate-700">
      {lines.map((line, index) => {
        const trimmedLine = line.trim();

        if (!trimmedLine) {
          return <span key={`space-${index}`} className="h-1" />;
        }

        const label = ["Amanda & Robson:", "Mari Betioli:"].find((prefix) =>
          trimmedLine.startsWith(prefix)
        );

        if (!label) {
          return <p key={`${trimmedLine}-${index}`}>{line}</p>;
        }

        return (
          <p key={`${trimmedLine}-${index}`}>
            <strong className="font-semibold text-slate-950">{label}</strong>
            {trimmedLine.slice(label.length)}
          </p>
        );
      })}
    </div>
  );
}

function inlineComputedStyles(sourceNode, targetNode) {
  const computedStyle = window.getComputedStyle(sourceNode);
  targetNode.style.cssText = Array.from(computedStyle)
    .map((property) => `${property}:${computedStyle.getPropertyValue(property)};`)
    .join("");

  Array.from(sourceNode.children).forEach((sourceChild, index) => {
    if (targetNode.children[index]) {
      inlineComputedStyles(sourceChild, targetNode.children[index]);
    }
  });
}

function downloadCanvas(canvas, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function waitForImageLoad(image) {
  return new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });
}

async function exportNodeAsPng(node, filename) {
  await document.fonts?.ready;

  const width = Math.ceil(node.offsetWidth);
  const height = Math.ceil(node.offsetHeight);
  const clone = node.cloneNode(true);
  inlineComputedStyles(node, clone);
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.style.margin = "0";
  clone.style.boxSizing = "border-box";

  const serializedNode = new XMLSerializer().serializeToString(clone);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;background:#ffffff;">
          ${serializedNode}
        </div>
      </foreignObject>
    </svg>
  `;
  const svgUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  const image = new Image();
  image.src = svgUrl;
  await waitForImageLoad(image);

  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.scale(scale, scale);
  context.drawImage(image, 0, 0);
  URL.revokeObjectURL(svgUrl);
  downloadCanvas(canvas, filename);
}

function ProposalModule({ hasCurrentDiagnosisData, proposal, onProposalChange, onGenerate, onExport }) {
  const updateProposal = (key, value) => onProposalChange({ ...proposal, [key]: value });
  const [pngExportStatus, setPngExportStatus] = useState("");

  async function exportProposalCardsAsPng() {
    const cards = Array.from(document.querySelectorAll(".proposal-page"));

    if (!cards.length) {
      return;
    }

    setPngExportStatus("Gerando PNGs...");

    try {
      for (const [index, card] of cards.entries()) {
        await exportNodeAsPng(card, `proposta-mariana-betioli-card-${String(index + 1).padStart(2, "0")}.png`);
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      setPngExportStatus("PNGs baixados");
      window.setTimeout(() => setPngExportStatus(""), 2500);
    } catch {
      setPngExportStatus("Não foi possível gerar os PNGs neste navegador");
    }
  }

  return (
    <section className="proposal-module grid gap-5">
      <div className="proposal-controls no-print rounded-lg border border-brand/15 bg-white p-5 shadow-panel">
        <div className="flex flex-col gap-4 border-l-4 border-brand pl-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-brand">Proposta comercial</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">Documento de parceria</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">
              Página independente para apresentar a proposta em linguagem comercial, positiva e
              orientada para crescimento. O diagnóstico entra apenas como contexto.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onGenerate}
              disabled={!hasCurrentDiagnosisData}
              className={`rounded-md border border-brand/20 bg-brand-soft px-4 py-3 text-sm font-bold text-brand hover:bg-brand/10 ${
                hasCurrentDiagnosisData ? "" : "cursor-not-allowed opacity-45"
              }`}
            >
              Gerar com dados atuais
            </button>
            <button
              type="button"
              onClick={onExport}
              disabled={!hasCurrentDiagnosisData}
              className={`rounded-md bg-brand px-4 py-3 text-sm font-bold text-white shadow-brand hover:bg-brand-deep ${
                hasCurrentDiagnosisData ? "" : "cursor-not-allowed opacity-45"
              }`}
            >
              Exportar proposta em PDF
            </button>
            <button
              type="button"
              onClick={exportProposalCardsAsPng}
              disabled={!hasCurrentDiagnosisData}
              className={`rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 ${
                hasCurrentDiagnosisData ? "" : "cursor-not-allowed opacity-45"
              }`}
            >
              Baixar cards em PNG
            </button>
          </div>
          {pngExportStatus ? (
            <p className="text-xs font-semibold text-slate-500 lg:text-right">{pngExportStatus}</p>
          ) : null}
        </div>
      </div>

      {!hasCurrentDiagnosisData ? (
        <p className="rounded-lg border border-dashed border-slate-200 bg-white px-4 py-5 text-sm text-slate-500 shadow-panel">
          Abra ou preencha um diagnóstico para gerar a proposta comercial.
        </p>
      ) : (
        <>
          <section className="proposal-editor no-print rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
            <div className="border-l-4 border-brand pl-4">
              <p className="text-xs font-bold uppercase text-brand">Edição manual</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-950">Campos da proposta</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Edite aqui antes de exportar. O documento abaixo já mostra a versão final para apresentação.
              </p>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <ProposalTextarea
                  label="Nossa visão sobre o projeto"
                  value={proposal.vision}
                  onChange={(value) => updateProposal("vision", value)}
                  rows={7}
                />
              </div>
              <ProposalTextarea
                label="Estratégia"
                value={proposal.strategy}
                onChange={(value) => updateProposal("strategy", value)}
                rows={4}
              />
              <ProposalTextarea
                label="Estrutura"
                value={proposal.structure}
                onChange={(value) => updateProposal("structure", value)}
                rows={4}
              />
              <ProposalTextarea
                label="Aquisição e conversão"
                value={proposal.acquisition}
                onChange={(value) => updateProposal("acquisition", value)}
                rows={4}
              />
              <ProposalTextarea
                label="LTV e expansão"
                value={proposal.expansion}
                onChange={(value) => updateProposal("expansion", value)}
                rows={4}
              />
              <ProposalTextarea
                label="Percentual da especialista"
                value={proposal.specialistPercentage}
                onChange={(value) => updateProposal("specialistPercentage", value)}
                rows={2}
              />
              <ProposalTextarea
                label="Percentual da parceria"
                value={proposal.partnershipPercentage}
                onChange={(value) => updateProposal("partnershipPercentage", value)}
                rows={2}
              />
              <div className="lg:col-span-2">
                <ProposalTextarea
                  label="Responsabilidades"
                  value={proposal.responsibilities}
                  onChange={(value) => updateProposal("responsibilities", value)}
                  rows={6}
                />
              </div>
              <ProposalTextarea
                label="Observações comerciais"
                value={proposal.observations}
                onChange={(value) => updateProposal("observations", value)}
                rows={4}
              />
              <ProposalTextarea
                label="Condições"
                value={proposal.conditions}
                onChange={(value) => updateProposal("conditions", value)}
                rows={4}
              />
            </div>
          </section>

          <div className="proposal-document grid gap-5">
            <ProposalPage title="Proposta de Parceria" cover>
              <div className="max-w-4xl border-t-2 border-brand/60 pt-6">
                <p className="text-3xl italic leading-tight text-slate-900 md:text-4xl">
                  Mariana Betioli
                </p>
                <div className="mt-10 grid max-w-xl gap-4 text-lg text-slate-600">
                  <p>
                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-brand">
                      Projeto
                    </span>
                    <span className="mt-2 block text-2xl font-semibold text-slate-950">
                      {APP_CONFIG.projectName}
                    </span>
                  </p>
                </div>
              </div>
            </ProposalPage>

            <ProposalPage number="02" eyebrow="Nossa visão sobre o projeto">
              <p className="max-w-5xl whitespace-pre-wrap text-base leading-7 text-slate-700">
                {proposal.vision}
              </p>
            </ProposalPage>

            <ProposalPage
              number="03"
              eyebrow="Nossa atuação no projeto"
              title="A Entrega Estratégica é dividida em 4 Frentes"
            >
              <div className="proposal-vertical-timeline relative mt-1 grid gap-5 border-l-2 border-brand/25 pl-8">
                {proposalWorkBlocks.map((block, index) => (
                  <section key={block.key} className="proposal-timeline-item relative pb-1">
                    <span className="absolute -left-[43px] top-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-brand text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                      Frente 0{index + 1}
                    </p>
                    <h4 className="mt-2 text-2xl font-semibold leading-tight text-slate-950">
                      {block.title}
                    </h4>
                    <p className="mt-3 max-w-5xl whitespace-pre-wrap text-base leading-7 text-slate-700">
                      {proposal[block.key]}
                    </p>
                  </section>
                ))}
              </div>
            </ProposalPage>

            <ProposalPage number="04" eyebrow="Plano de trabalho" title="Plano de Trabalho">
              <p className="-mt-4 text-xl italic leading-tight text-slate-700">
                Etapas, objetivos, entregas e prazos
              </p>
              <div className="proposal-plan-board mt-10">
                <div className="grid gap-6 md:grid-cols-3">
                  {proposalTimeline.map((item) => (
                    <h4
                      key={item.phase}
                      className="text-lg font-bold uppercase leading-5 text-[#1f3d35]"
                    >
                      {item.phase}
                    </h4>
                  ))}
                </div>
                <div className="proposal-plan-line my-5 hidden h-6 rounded-full bg-gradient-to-r from-[#fff0cf] via-[#e6c16a] to-[#dba437] md:block" />
                <div className="grid gap-6 md:grid-cols-3">
                  {proposalTimeline.map((item) => (
                    <article
                      key={item.phase}
                      className="proposal-timeline-item overflow-hidden rounded-md border border-[#e5bd68] bg-white"
                    >
                      <div className="bg-[#f5dca8] px-4 py-3 text-sm leading-5 text-slate-900">
                        <strong>Objetivo:</strong> {item.objective}
                      </div>
                      <div className="px-4 py-4 text-sm leading-5 text-slate-800">
                        <p className="font-bold">Entregas:</p>
                        <ul className="mt-1 list-disc space-y-1 pl-5">
                          {item.deliveries.map((delivery) => (
                            <li key={delivery}>{delivery}</li>
                          ))}
                        </ul>
                        <p className="mt-4">
                          <strong>Tempo estimado:</strong> {item.deadline}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </ProposalPage>

            <ProposalPage number="05" eyebrow="Responsabilidades" title="Responsabilidades">
              <ProposalResponsibilities value={proposal.responsibilities} />
            </ProposalPage>

            <ProposalPage
              number="06"
              eyebrow="Modelo de parceria + proposta comercial"
              title="Modelo de Coprodução"
            >
              <div className="grid gap-7">
                <div className="max-w-5xl text-base leading-7 text-slate-800">
                  <p>
                    Formato baseado em divisão percentual. Todos os investimentos, custos operacionais
                    e receitas serão compartilhados conforme o percentual acordado entre as partes.
                  </p>
                  <p className="mt-4">
                    O modelo busca alinhar interesses e garantir que o crescimento do projeto beneficie
                    todos os envolvidos.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <section className="border-t border-brand/35 pt-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                      Percentual da especialista
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-3xl font-semibold text-slate-950">
                      {proposal.specialistPercentage || "A definir"}
                    </p>
                  </section>
                  <section className="border-t border-brand/35 pt-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                      Percentual da parceria
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-3xl font-semibold text-slate-950">
                      {proposal.partnershipPercentage || "A definir"}
                    </p>
                  </section>
                </div>
                <p className="rounded-md border border-brand/20 bg-brand-soft px-5 py-4 text-base font-semibold leading-7 text-brand">
                  Modelo de coprodução com divisão proporcional de receitas e custos da operação.
                </p>
              </div>
            </ProposalPage>

            <ProposalPage number="07" eyebrow="Observações + condições" title="Observações e Condições">
              <div className="grid gap-7 md:grid-cols-2">
                <section className="border-t border-slate-300 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                    Observações comerciais
                  </p>
                  <p className="mt-4 whitespace-pre-wrap text-base leading-7 text-slate-700">
                    {proposal.observations || "A definir."}
                  </p>
                </section>
                <section className="border-t border-slate-300 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
                    Condições
                  </p>
                  <p className="mt-4 whitespace-pre-wrap text-base leading-7 text-slate-700">
                    {proposal.conditions || "A definir."}
                  </p>
                </section>
              </div>
            </ProposalPage>
          </div>
        </>
      )}
    </section>
  );
}

function LoginScreen({ status, message, onLogin }) {
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(password);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 py-8 text-slate-900">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-panel">
        <div className="border-b border-slate-100 pb-5">
          <p className="text-xs font-bold uppercase text-brand">Acesso protegido</p>
          <img
            src={mariProfileLockup}
            alt={`${APP_CONFIG.expertName} - ${APP_CONFIG.projectName}`}
            className="mt-3 w-full rounded-lg object-contain"
          />
          <h1 className="mt-5 text-2xl font-semibold text-slate-950">
            Diagnóstico estratégico
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Digite a senha de acesso para visualizar o diagnóstico e o histórico salvo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          <label>
            <span className="text-xs font-bold uppercase text-slate-500">Senha</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
              placeholder="Digite a senha"
            />
          </label>

          {message ? (
            <p className="rounded-md border border-brand/15 bg-brand-soft px-4 py-3 text-sm leading-6 text-brand-deep">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "checking"}
            className="rounded-md bg-brand px-4 py-3 text-sm font-bold text-white shadow-brand transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "checking" ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default function App() {
  const [authStatus, setAuthStatus] = useState("checking");
  const [authMessage, setAuthMessage] = useState("");
  const [activeStage, setActiveStage] = useState(getStageFromHash);
  const [data, setData] = useState(loadCurrentDiagnosis);
  const [savedDiagnoses, setSavedDiagnoses] = useState(loadSavedDiagnoses);
  const [proposal, setProposal] = useState(
    () =>
      normalizeProposalFields(safeReadJson(PROPOSAL_STORAGE_KEY, null)) ||
      buildProposalFields(loadCurrentDiagnosis())
  );
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState("");
  const [saveState, setSaveState] = useState("Salvo localmente");
  const [printMode, setPrintMode] = useState("diagnosis");

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const response = await fetch("/api/session", { credentials: "include" });
        const result = await response.json();

        if (!active) {
          return;
        }

        if (result.authenticated) {
          setAuthStatus("authenticated");
          setAuthMessage("");
          return;
        }

        setAuthStatus("unauthenticated");
        setAuthMessage(
          result.configured
            ? ""
            : "A senha ainda não foi configurada na Vercel. Configure ACCESS_PASSWORD nas variáveis de ambiente."
        );
      } catch {
        if (active) {
          setAuthStatus("unauthenticated");
          setAuthMessage("Não foi possível verificar a sessão. Tente novamente em instantes.");
        }
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      window.localStorage.setItem(CURRENT_DIAGNOSIS_KEY, JSON.stringify(data));
      if (hasDiagnosisData(data) || !hasPreviousCurrentDiagnosisData()) {
        window.localStorage.setItem(STORAGE_MIGRATION_KEY, "true");
      }
      setSaveState("Salvo localmente");
    }, 250);

    setSaveState("Salvando...");
    return () => window.clearTimeout(timeout);
  }, [data]);

  useEffect(() => {
    window.localStorage.setItem(SAVED_DIAGNOSES_KEY, JSON.stringify(savedDiagnoses));
  }, [savedDiagnoses]);

  useEffect(() => {
    window.localStorage.setItem(PROPOSAL_STORAGE_KEY, JSON.stringify(proposal));
  }, [proposal]);

  useEffect(() => {
    const resetPrintMode = () => setPrintMode("diagnosis");
    window.addEventListener("afterprint", resetPrintMode);
    return () => window.removeEventListener("afterprint", resetPrintMode);
  }, []);

  useEffect(() => {
    if (authStatus !== "authenticated" || safeReadJson(PUBLISHED_DIAGNOSIS_SEED_KEY, false)) {
      return;
    }

    let active = true;

    async function seedPublishedDiagnosis() {
      try {
        const response = await fetch("/api/published-diagnosis", { credentials: "include" });

        if (!response.ok) {
          return;
        }

        const result = await response.json();
        const diagnosis = result.diagnosis;

        if (!active || !diagnosis?.data) {
          return;
        }

        const publishedDiagnosis = createSavedDiagnosis(diagnosis.data, {
          id: diagnosis.id || PUBLISHED_DIAGNOSIS_ID,
          name: diagnosis.name || "Diagnóstico Mari Betioli — 01/06/2026 13:33",
          savedAt: diagnosis.savedAt || PUBLISHED_DIAGNOSIS_SAVED_AT,
          updatedAt: diagnosis.updatedAt || diagnosis.savedAt || PUBLISHED_DIAGNOSIS_SAVED_AT
        });
        const publishedSnapshot = snapshotDiagnosis(publishedDiagnosis.data);

        setSavedDiagnoses((current) => {
          const alreadySaved = current.some(
            (item) =>
              item.id === publishedDiagnosis.id ||
              snapshotDiagnosis(item.data) === publishedSnapshot
          );

          window.localStorage.setItem(PUBLISHED_DIAGNOSIS_SEED_KEY, "true");

          if (alreadySaved) {
            return current;
          }

          return [publishedDiagnosis, ...current].sort(
            (first, second) => new Date(second.savedAt) - new Date(first.savedAt)
          );
        });
      } catch {
        setSaveState("Histórico protegido indisponível");
      }
    }

    seedPublishedDiagnosis();

    return () => {
      active = false;
    };
  }, [authStatus]);

  useEffect(() => {
    const handleHashChange = () => setActiveStage(getStageFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const completedFields = useMemo(() => {
    return stages.reduce((total, stage) => total + getFilledFields(data[stage.id] || {}), 0);
  }, [data]);

  const totalFields = stages.length * fieldConfig.length;
  const progress = Math.round((completedFields / totalFields) * 100);
  const currentStage = stages.find((stage) => stage.id === activeStage) || stages[0];
  const isSummary = activeStage === "resumo";
  const isProposal = activeStage === "proposta";
  const hasCurrentDiagnosisData = useMemo(() => hasDiagnosisData(data), [data]);
  const reportData = data;
  const currentSnapshot = useMemo(() => snapshotDiagnosis(data), [data]);
  const hasUnsavedChanges = useMemo(() => {
    if (!hasCurrentDiagnosisData) {
      return false;
    }

    const matchesSavedDiagnosis = savedDiagnoses.some(
      (diagnosis) => snapshotDiagnosis(diagnosis.data) === currentSnapshot
    );

    return currentSnapshot !== lastSavedSnapshot && !matchesSavedDiagnosis;
  }, [currentSnapshot, hasCurrentDiagnosisData, lastSavedSnapshot, savedDiagnoses]);

  const consolidated = useMemo(() => buildExecutiveSummary(reportData), [reportData]);

  function navigateTo(stageId) {
    window.location.hash = stageId;
    setActiveStage(stageId);
  }

  async function login(password) {
    setAuthStatus("checking");
    setAuthMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });
      const result = await response.json();

      if (!response.ok) {
        setAuthStatus("unauthenticated");
        setAuthMessage(result.message || "Não foi possível entrar.");
        return;
      }

      setAuthStatus("authenticated");
      setAuthMessage("");
    } catch {
      setAuthStatus("unauthenticated");
      setAuthMessage("Não foi possível conectar ao servidor de login.");
    }
  }

  async function logout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include"
      });
    } finally {
      setAuthStatus("unauthenticated");
      setAuthMessage("");
    }
  }

  function updateField(fieldKey, value) {
    setData((current) => ({
      ...current,
      [activeStage]: {
        ...current[activeStage],
        [fieldKey]: value
      }
    }));
  }

  function updateSignal(signal, checked) {
    setData((current) => {
      const currentSignals = Array.isArray(current[activeStage]?.signals)
        ? current[activeStage].signals
        : [];
      const nextSignals = checked
        ? Array.from(new Set([...currentSignals, signal]))
        : currentSignals.filter((item) => item !== signal);

      return {
        ...current,
        [activeStage]: {
          ...current[activeStage],
          signals: nextSignals
        }
      };
    });
  }

  async function copySummary() {
    if (!hasCurrentDiagnosisData) {
      setSaveState("Nenhum diagnóstico aberto");
      return;
    }

    await navigator.clipboard.writeText(formatSummary(reportData));
    setSaveState("Resumo copiado");
  }

  function saveDiagnostic() {
    if (!hasCurrentDiagnosisData) {
      setSaveState("Nenhum diagnóstico para salvar");
      return;
    }

    const diagnosis = createSavedDiagnosis(data);
    setSavedDiagnoses((current) => [diagnosis, ...current]);
    setLastSavedSnapshot(snapshotDiagnosis(diagnosis.data));
    setSaveState("Diagnóstico salvo");
  }

  function clearCurrentDiagnosis(nextMessage) {
    const emptyDiagnosis = createInitialData();
    window.localStorage.setItem(PREVIOUS_CURRENT_DIAGNOSIS_KEY, JSON.stringify(emptyDiagnosis));
    setData(emptyDiagnosis);
    navigateTo(stages[0].id);
    setLastSavedSnapshot(snapshotDiagnosis(emptyDiagnosis));
    setSaveState(nextMessage);
  }

  function newDiagnosis() {
    const confirmed = window.confirm(
      "Deseja iniciar um novo diagnóstico? O preenchimento atual será limpo, mas diagnósticos salvos continuarão disponíveis."
    );

    if (confirmed) {
      clearCurrentDiagnosis("Novo diagnóstico iniciado");
    }
  }

  function resetCurrentDiagnosis() {
    const confirmed = window.confirm("Tem certeza que deseja limpar o preenchimento atual?");

    if (confirmed) {
      clearCurrentDiagnosis("Preenchimento resetado");
    }
  }

  function getFirstFilledStageId(diagnosisData) {
    return (
      stages.find((stage) => {
        const stageData = diagnosisData[stage.id] || {};
        return (
          fieldConfig.some((field) => stageData[field.key]?.trim()) ||
          stageData.signals?.length > 0
        );
      })?.id || stages[0].id
    );
  }

  function loadSavedDiagnosis(diagnosis, nextStage, message) {
    if (
      hasUnsavedChanges &&
      !window.confirm(
        "Há um preenchimento atual não salvo. Deseja abrir este diagnóstico salvo e substituir o preenchimento atual?"
      )
    ) {
      return;
    }

    const normalizedData = mergeSavedData(diagnosis.data);
    setData(normalizedData);
    navigateTo(nextStage(normalizedData));
    setLastSavedSnapshot(snapshotDiagnosis(normalizedData));
    setSaveState(message);
  }

  function openSavedDiagnosis(diagnosis) {
    loadSavedDiagnosis(diagnosis, () => "resumo", "Diagnóstico aberto");
  }

  function editSavedDiagnosis(diagnosis) {
    loadSavedDiagnosis(
      diagnosis,
      (normalizedData) => getFirstFilledStageId(normalizedData),
      "Diagnóstico aberto para edição"
    );
  }

  function deleteSavedDiagnosis(diagnosis) {
    const confirmed = window.confirm("Tem certeza que deseja excluir este diagnóstico salvo?");

    if (confirmed) {
      setSavedDiagnoses((current) => current.filter((item) => item.id !== diagnosis.id));
      if (snapshotDiagnosis(diagnosis.data) === currentSnapshot) {
        setLastSavedSnapshot("");
      }
      setSaveState("Diagnóstico excluído");
    }
  }

  function duplicateSavedDiagnosis(diagnosis) {
    const duplicated = createSavedDiagnosis(diagnosis.data, {
      name: `Cópia de ${diagnosis.name} — ${formatDateTime()}`
    });
    setSavedDiagnoses((current) => [duplicated, ...current]);
    setSaveState("Diagnóstico duplicado");
  }

  function generateProposal() {
    if (!hasCurrentDiagnosisData) {
      setSaveState("Abra um diagnóstico para gerar a proposta");
      return;
    }

    setProposal((current) => buildProposalFields(data, current));
    setSaveState("Proposta atualizada");
  }

  function exportPdf() {
    if (!hasCurrentDiagnosisData) {
      setSaveState("Nenhum diagnóstico aberto");
      return;
    }

    setPrintMode("diagnosis");
    window.setTimeout(() => window.print(), 50);
  }

  function exportProposalPdf() {
    if (!hasCurrentDiagnosisData) {
      setSaveState("Nenhum diagnóstico aberto");
      return;
    }

    setPrintMode("proposal");
    window.setTimeout(() => window.print(), 50);
  }

  if (authStatus !== "authenticated") {
    return <LoginScreen status={authStatus} message={authMessage} onLogin={login} />;
  }

  return (
    <main className={`min-h-screen bg-slate-100 text-slate-900 print-mode-${printMode}`}>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-80 overflow-y-auto border-r border-slate-200 bg-white px-5 py-6 shadow-sidebar lg:block">
        <div className="border-b border-slate-100 pb-6">
          <p className="text-xs font-bold uppercase text-brand">Discovery estratégico</p>
          <img
            src={mariProfileLockup}
            alt={`${APP_CONFIG.expertName} - ${APP_CONFIG.projectName}`}
            className="mt-3 w-full rounded-lg object-contain"
          />
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Workspace de diagnóstico para registrar respostas, hipóteses e leitura consultiva ao vivo.
          </p>
        </div>

        <nav className="mt-6 grid gap-2">
          {stages.map((stage) => {
            const filled = getFilledFields(data[stage.id] || {});
            const active = activeStage === stage.id;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => navigateTo(stage.id)}
                className={`grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
                  active
                    ? "border-brand bg-brand text-white shadow-brand"
                    : "border-transparent bg-white text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-md text-xs font-bold ${
                    active ? "bg-white/15 text-white" : "bg-brand-soft text-brand"
                  }`}
                >
                  {stage.number}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{stage.title}</span>
                  <span className={active ? "text-xs text-white/70" : "text-xs text-slate-400"}>
                    {stage.eyebrow}
                  </span>
                </span>
                <span
                  className={`rounded-full px-2 py-1 text-[11px] font-bold ${
                    active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {filled}/4
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => navigateTo("resumo")}
            className={`mt-3 rounded-lg border px-4 py-4 text-left transition ${
              isSummary
                ? "border-brand bg-brand text-white shadow-brand"
                : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-white"
            }`}
          >
            <span className="block text-sm font-semibold">Resumo e Diagnóstico</span>
            <span className={isSummary ? "text-xs text-white/70" : "text-xs text-slate-500"}>
              Síntese consolidada
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo("proposta")}
            className={`rounded-lg border px-4 py-4 text-left transition ${
              isProposal
                ? "border-brand bg-brand text-white shadow-brand"
                : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-white"
            }`}
          >
            <span className="block text-sm font-semibold">Proposta Comercial</span>
            <span className={isProposal ? "text-xs text-white/70" : "text-xs text-slate-500"}>
              Documento de parceria
            </span>
          </button>
        </nav>

        <section className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase text-slate-400">Sessão atual</p>
          <div className="mt-3 grid gap-2">
            <button
              type="button"
              onClick={newDiagnosis}
              className="rounded-md bg-brand px-3 py-2 text-sm font-bold text-white shadow-brand hover:bg-brand-deep"
            >
              Novo diagnóstico
            </button>
            <button
              type="button"
              onClick={resetCurrentDiagnosis}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Resetar preenchimento
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-md border border-brand/20 bg-white px-3 py-2 text-sm font-bold text-brand hover:bg-brand-soft"
            >
              Sair
            </button>
          </div>
        </section>
      </aside>

      <section className="lg:pl-80">
        <header className="z-10 border-b border-slate-200 bg-white/92 px-4 py-4 backdrop-blur md:px-7 lg:sticky lg:top-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase text-brand">
                  {isProposal ? "Proposta" : isSummary ? "Etapa final" : `Etapa ${currentStage.number}`}
                </span>
                <span className="text-xs font-semibold text-slate-500">{saveState}</span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-brand/20 bg-white px-3 py-1 text-xs font-bold text-brand hover:bg-brand-soft"
                >
                  Sair
                </button>
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                {isProposal ? "Proposta Comercial" : isSummary ? "Resumo e Diagnóstico" : currentStage.title}
              </h2>
            </div>

            <div className="min-w-full lg:min-w-[320px]">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Progresso do diagnóstico</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-brand transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-4 flex max-w-7xl gap-2 overflow-x-auto pb-1 lg:hidden">
            {[...stages, { id: "resumo", number: "R", title: "Resumo" }, { id: "proposta", number: "P", title: "Proposta" }].map((stage) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => navigateTo(stage.id)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold ${
                  activeStage === stage.id
                    ? "border-brand bg-brand text-white"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {stage.number} {stage.title}
              </button>
            ))}
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-6 md:px-7 md:py-8">
          {!isSummary && !isProposal ? (
            <div className="grid gap-6">
              <FlowCard title={currentStage.title} eyebrow="Tema da categoria" tone="brand">
                <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1.25fr]">
                  <div className="rounded-md border border-white/15 bg-white/10 px-4 py-3">
                    <p className="text-xs font-bold uppercase text-white/60">Orientação da etapa</p>
                    <p className="mt-2 text-sm leading-6 text-white/85">{currentStage.orientation}</p>
                  </div>
                  <div className="rounded-md border border-white/15 bg-white/10 px-4 py-3">
                    <p className="text-xs font-bold uppercase text-white/60">Objetivo da validação</p>
                    <p className="mt-2 text-sm leading-6 text-white/85">{currentStage.objective}</p>
                  </div>
                </div>
              </FlowCard>

              <section className="grid items-stretch gap-4 lg:grid-cols-2">
                <InsightList
                  title="Tópicos de validação"
                  items={currentStage.validationTopics}
                />
                <InsightList title="Perguntas de apoio" items={currentStage.supportQuestions} />
              </section>

              {currentStage.id === "vendas" ? <SalesPerformance /> : null}

              <section className="grid gap-4">
                <div className="flex flex-col gap-2 border-l-4 border-brand pl-4">
                  <p className="text-xs font-bold uppercase text-brand">Registro da conversa</p>
                  <h3 className="text-xl font-semibold text-slate-950">
                    Respostas, observações, insights e hipóteses
                  </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {fieldConfig.map((field) => (
                    <Field
                      key={field.key}
                      field={field}
                      value={data[activeStage]?.[field.key] || ""}
                      onChange={updateField}
                    />
                  ))}
                </div>

                <StrategicSignals
                  stage={currentStage}
                  selectedSignals={data[activeStage]?.signals || []}
                  onChange={updateSignal}
                />
              </section>
            </div>
          ) : isSummary ? (
            <div className="grid gap-5">
              <div className="diagnostic-summary-content grid gap-5">
                <section className="print-only print-report-header rounded-lg border border-brand/15 bg-white p-5">
                  <img
                    src={mariProfileLockup}
                    alt={`${APP_CONFIG.expertName} - ${APP_CONFIG.projectName}`}
                    className="print-report-logo"
                  />
                  <div className="mt-4 border-l-4 border-brand pl-4">
                    <p className="text-xs font-bold uppercase text-brand">Diagnóstico estratégico</p>
                    <h1 className="mt-1 text-3xl font-semibold text-slate-950">
                      {APP_CONFIG.expertName}
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {APP_CONFIG.projectName} · Relatório executivo de discovery
                    </p>
                  </div>
                </section>

                <section className="rounded-lg border border-brand/15 bg-white p-5 shadow-panel">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase text-brand">Síntese executiva</p>
                      <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                        {hasCurrentDiagnosisData
                          ? "Diagnóstico consolidado da reunião"
                          : "Nenhum diagnóstico aberto"}
                      </h2>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
                        {hasCurrentDiagnosisData
                          ? "O resumo abaixo é gerado automaticamente a partir dos registros das etapas. Edite os campos anteriores para refinar a leitura final antes de salvar ou exportar."
                          : "O preenchimento atual está limpo. Abra um diagnóstico salvo no histórico para visualizar o relatório, exportar em PDF ou editar as respostas."}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={exportPdf}
                        disabled={!hasCurrentDiagnosisData}
                        className={`rounded-md bg-brand px-4 py-3 text-sm font-bold text-white shadow-brand hover:bg-brand-deep ${
                          hasCurrentDiagnosisData ? "" : "cursor-not-allowed opacity-45"
                        }`}
                      >
                        Exportar em PDF
                      </button>
                      <button
                        type="button"
                        onClick={copySummary}
                        disabled={!hasCurrentDiagnosisData}
                        className={`rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 ${
                          hasCurrentDiagnosisData ? "" : "cursor-not-allowed opacity-45"
                        }`}
                      >
                        Copiar resumo completo
                      </button>
                      <button
                        type="button"
                        onClick={saveDiagnostic}
                        disabled={!hasCurrentDiagnosisData}
                        className={`rounded-md border border-brand/20 bg-brand-soft px-4 py-3 text-sm font-bold text-brand hover:bg-brand/10 ${
                          hasCurrentDiagnosisData ? "" : "cursor-not-allowed opacity-45"
                        }`}
                      >
                        Salvar diagnóstico
                      </button>
                      <button
                        type="button"
                        onClick={newDiagnosis}
                        className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                      >
                        Novo diagnóstico
                      </button>
                      <button
                        type="button"
                        onClick={resetCurrentDiagnosis}
                        className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                      >
                        Resetar preenchimento
                      </button>
                    </div>
                  </div>
                </section>

                <SavedDiagnosesPanel
                  diagnoses={savedDiagnoses}
                  onOpen={openSavedDiagnosis}
                  onEdit={editSavedDiagnosis}
                  onDelete={deleteSavedDiagnosis}
                  onDuplicate={duplicateSavedDiagnosis}
                />

                {hasCurrentDiagnosisData ? (
                  <>
                    <SalesPerformance />

                    <section className="print-stack grid gap-4 lg:grid-cols-2">
                      {consolidated.map((section) => (
                        <SummarySection
                          key={section.title}
                          title={section.title}
                          entries={section.entries}
                          marker={section.marker}
                          icon={section.icon}
                          tone={section.tone}
                        />
                      ))}
                    </section>

                    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
                      <div className="flex flex-col gap-2 border-l-4 border-brand pl-4">
                        <p className="text-xs font-bold uppercase text-brand">Resumo completo</p>
                        <h3 className="text-2xl font-semibold text-slate-950">
                          Relatório executivo por etapa
                        </h3>
                        <p className="max-w-3xl text-sm leading-7 text-slate-500">
                          Leitura organizada para apresentação após a reunião, separando respostas,
                          observações, insights e hipóteses por categoria.
                        </p>
                      </div>

                      <div className="mt-5 grid gap-4">
                        {stages.map((stage) => (
                          <StageReportCard
                            key={stage.id}
                            stage={stage}
                            stageData={reportData[stage.id] || {}}
                          />
                        ))}
                      </div>
                    </section>
                  </>
                ) : (
                  <EmptySummaryState savedCount={savedDiagnoses.length} />
                )}
              </div>
            </div>
          ) : (
            <ProposalModule
              hasCurrentDiagnosisData={hasCurrentDiagnosisData}
              proposal={proposal}
              onProposalChange={setProposal}
              onGenerate={generateProposal}
              onExport={exportProposalPdf}
            />
          )}
        </div>
      </section>
    </main>
  );
}
