import { useEffect, useMemo, useState } from "react";
import mariProfileLockup from "../Mari Betioli perfil.png";

const APP_CONFIG = {
  expertName: "Mari Betioli",
  projectName: "Poder do Parto",
  brandColor: "#702299"
};

const LEGACY_STORAGE_KEY = "mari-betioli-discovery-diagnostic-v1";
const PREVIOUS_CURRENT_DIAGNOSIS_KEY = "mari-betioli-current-diagnosis-v2";
const PREVIOUS_SAVED_DIAGNOSES_KEY = "mari-betioli-saved-diagnoses-v2";
const CURRENT_DIAGNOSIS_KEY = "currentDiagnosis";
const SAVED_DIAGNOSES_KEY = "savedDiagnoses";
const STORAGE_MIGRATION_KEY = "mari-betioli-storage-migration-v3";

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
  { label: "Jun/24", value: 1 },
  { label: "Ago/24", value: 22 },
  { label: "Set/24", value: 7 },
  { label: "Out/24", value: 3 },
  { label: "Nov/24", value: 2 },
  { label: "Dez/24", value: 2 },
  { label: "Jan/25", value: 5 },
  { label: "Fev/25", value: 27 },
  { label: "Mar/25", value: 11 },
  { label: "Abr/25", value: 16 },
  { label: "Mai/25", value: 13 },
  { label: "Jun/25", value: 15 },
  { label: "Jul/25", value: 23 },
  { label: "Ago/25", value: 43 },
  { label: "Set/25", value: 25 },
  { label: "Out/25", value: 12 },
  { label: "Nov/25", value: 32 },
  { label: "Dez/25", value: 20 },
  { label: "Jan/26", value: 28 },
  { label: "Fev/26", value: 7 },
  { label: "Mar/26", value: 7 },
  { label: "Abr/26", value: 5 },
  { label: "Mai/26", value: 7 }
];

const salesHighlights = [
  { label: "Período", value: "Jun/24 a Mai/26" },
  { label: "Vendas", value: "293 vendas" },
  { label: "Pico absoluto", value: "Agosto de 2025 · 43 vendas" }
];

const PUBLISHED_DIAGNOSIS = {
  estrutura: {
    resposta:
      "Ela está completamente sozinha.\nDesde a ideia de conteúdo até gravação, edição e ManyChat.",
    observacoes:
      "Uma pequena agência de marketing repassa algumas demandas.\nNão há traqueamento nas páginas.",
    insights: "O projeto tem potencial, mas precisa de ajustes primeiro.",
    hipoteses:
      "Adicionar:\n- Quiz de pré-qualificação\n- Pesquisa pós-compra\n- Testar mais 1 versão da página de vendas\n- Avaliar as métricas da VSL na Vturb",
    signals: [
      "Operação centralizada na especialista",
      "Ausência de time de marketing",
      "Ausência de comercial estruturado",
      "Baixa clareza de processos internos",
      "Necessidade de organização operacional",
      "Dependência de terceiros pontuais"
    ]
  },
  vendas: {
    resposta:
      "Fluxo do ManyChat manda para o WhatsApp, onde há uma aula gratuita (VSL).\nPrecisa olhar na Hotmart, pois não tem isso planilhado.\nAs vendas acontecem de forma passiva.",
    observacoes: "Vendia todo dia com a estrutura anterior.",
    insights:
      "Ela tem um bom alcance, mas não faz um trabalho de conversão no direct.\nAdicionar um braço de SS pode aumentar a conversão.",
    hipoteses:
      "- Adicionar um braço comercial para conversão e recuperação de vendas.\n- CS para aumentar o LTV",
    signals: [
      "Vendas 100% orgânicas",
      "Baixa previsibilidade de vendas",
      "Falta de clareza sobre origem das vendas",
      "Ausência de acompanhamento mensal",
      "Potencial de otimização da conversão",
      "Conversão passiva pela página",
      "Perpétuo rodando sem tráfego pago"
    ]
  },
  base: {
    resposta:
      "Base continua em 2k alunas, mas não são todas do curso online; também conta com atendimentos presenciais.\nExiste acompanhamento após a compra em um grupo.",
    observacoes:
      "É perceptível a falta de clareza sobre as alunas e a falta de estrutura após a compra.",
    insights:
      "A gestação mexe muito com os hormônios femininos. Acredito que ir além da venda do primeiro produto e gerar uma comunidade forte pode ser um bom caminho para o projeto ganhar peso e aumentar o faturamento.",
    hipoteses:
      "- Identificar a janela de compra\n- Entender as dores por fase da gestação\n- Identificar o que cada perfil compraria após o curso principal.",
    signals: [
      "Base pouco segmentada",
      "Potencial de ativação da base",
      "Relacionamento pós-compra informal",
      "Potencial de comunidade",
      "Possível janela de compra curta"
    ]
  },
  pesquisa: {
    resposta: "Não existe pesquisa.",
    observacoes:
      'Ela apresentou baixa consciência sobre os próprios dados. Ela sabe o macro, "compram porque estão grávidas e têm urgência", mas não sabe dizer com mais detalhes:\n- Perfil das compradoras\n- Motivos de compra\n- Jornada da gestação\n- Principais preocupações\n- Classe social predominante',
    insights:
      "Desenvolver uma pesquisa para identificar:\n- contexto da compra;\n- nível de comprometimento;\n- perfil da gestação;\n- momento de vida;\n- capacidade de investimento relacionada ao parto.\n\nExemplos de perguntas:\n1. Sobre o parto: onde você pretende ter seu bebê?\na) SUS\nb) Convênio\nc) Particular\n\n2. Sobre a equipe: você pretende contratar equipe particular para acompanhamento do parto?\na) Sim\nb) Não\nc) Ainda não sei\n\n3. Sobre os investimentos na gestação: qual dessas situações mais se aproxima da sua realidade?\na) Estou tentando economizar ao máximo durante a gestação.\nb) Invisto apenas no que considero essencial.\nc) Estou investindo em profissionais e serviços que me tragam mais segurança.\nd) Estou montando toda a experiência do parto de acordo com minhas preferências.\n\n4. O que levou você a comprar agora?\na) Medo de sofrer violência obstétrica\nb) Medo da dor\nc) Desejo de ter um parto normal\nd) Falta de informação\ne) Recomendação de outra mãe\nf) Conteúdo da Mari\ng) Outro\n\n5. O que quase impediu sua compra?\n\n6. Em qual momento da gestação você comprou?\na) Tentando engravidar\nb) 1º trimestre\nc) 2º trimestre\nd) 3º trimestre\ne) Próxima da DPP",
    hipoteses:
      "Validar o perfil econômico de forma indireta através do contexto do parto, equipe escolhida e investimentos realizados durante a gestação, evitando perguntas explícitas sobre renda.",
    signals: [
      "Ausência de pesquisa pós-compra",
      "Baixa clareza sobre ICP real",
      "Motivos de compra pouco registrados",
      "Objeções ainda pouco mapeadas",
      "Potencial de segmentação por trimestre",
      "Potencial de novos produtos a partir da jornada",
      "Forte dor emocional no processo de compra"
    ]
  },
  produtos: {
    resposta: "Curso de amamentação já está escrito.",
    observacoes:
      "Ela relatou que tem um produto escrito, mas que não faz sentido gravar e lançar antes de ajustar o funil principal.",
    insights:
      "Adicionar um funil de quiz para levar para ofertas distintas, de acordo com o perfil do lead.",
    hipoteses:
      "Implementar um quiz para identificar o momento da gestante.\n\nExemplo:\n0 a 3 meses -> caminho 1: O Poder do Parto + O.D 01 + Upsell 01\n4 a 6 meses -> caminho 2: O Poder do Parto + O.D 02 + Upsell 02\n7 a 9 meses -> caminho 3: O Poder do Parto + O.D 03 + Upsell 03\n\nPois dependendo da fase da gestação, as dores e objeções são diferentes.",
    signals: [
      "Produto em desenvolvimento",
      "Oportunidade de produto pós-parto",
      "Oportunidade de produto complementar",
      "Oportunidade de produto de amamentação",
      "Oportunidade de assessoria ou acompanhamento"
    ]
  },
  prioridades: {
    resposta:
      "Ajustar o funil perpétuo e adicionar produtos conforme as vendas vão acontecendo.\nEla disse que vendia bem até mudar a estrutura do perpétuo.",
    observacoes:
      "Ela entende que o funil está mal estruturado, não tem clareza sobre as métricas e identificou uma queda nas vendas depois das mudanças realizadas.",
    insights:
      "Primeiro ajustar o que já está rodando e aos poucos adicionar mais produtos para aumentar o ticket médio.",
    hipoteses:
      "Falta metrificar os dados de tráfego, conversão etc.\nA estrutura está bem incompleta, então não dá para saber com precisão o maior gargalo. Teremos que arrumar a casa primeiro e começar a coletar dados para depois pensar em escala.",
    signals: [
      "Prioridade em organizar operação",
      "Prioridade em aumentar vendas",
      "Prioridade em melhorar conversão",
      "Prioridade em entender dados",
      "Prioridade em criar previsibilidade"
    ]
  }
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

function getStageFromHash() {
  const hash = window.location.hash.replace("#", "");
  const validIds = new Set([...stages.map((stage) => stage.id), "resumo"]);
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
  const source = Array.isArray(saved) && saved.length ? saved : previousSaved;

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
  const chartHeight = 260;
  const padding = { top: 22, right: 22, bottom: 46, left: 42 };
  const maxValue = 45;
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const points = salesByWhatsAppData.map((item, index) => {
    const x = padding.left + (index / (salesByWhatsAppData.length - 1)) * plotWidth;
    const y = padding.top + (1 - item.value / maxValue) * plotHeight;

    return { ...item, x, y };
  });
  const path = points.map((point) => `${point.x},${point.y}`).join(" ");
  const peak = points.reduce((highest, point) => (point.value > highest.value ? point : highest), points[0]);
  const labelIndexes = new Set([0, 4, 8, 12, 13, 16, 20, 22]);

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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_0.75fr]">
        <div className="rounded-lg border border-brand/10 bg-brand-soft/45 p-4">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            role="img"
            aria-label="Gráfico de vendas mensais por WhatsApp"
            className="h-auto w-full"
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
                    stroke="#D9C2E6"
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
              strokeWidth="1.5"
            />
            <line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={chartHeight - padding.bottom}
              stroke="#BFA7CE"
              strokeWidth="1.5"
            />

            <polyline
              fill="none"
              points={path}
              stroke={APP_CONFIG.brandColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />

            {points.map((point, index) => (
              <g key={point.label}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={point.label === peak.label ? 6 : 4}
                  fill={point.label === peak.label ? "#4E176F" : APP_CONFIG.brandColor}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                {labelIndexes.has(index) ? (
                  <text
                    x={point.x}
                    y={chartHeight - padding.bottom + 23}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#475569"
                  >
                    {point.label}
                  </text>
                ) : null}
              </g>
            ))}

            <g transform={`translate(${peak.x - 78} ${peak.y - 36})`}>
              <rect width="156" height="28" rx="8" fill="#4E176F" />
              <text x="78" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFFFFF">
                Ago/25 · 43 vendas
              </text>
            </g>
          </svg>
        </div>

        <aside className="grid content-start gap-3">
          {salesHighlights.map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-panel">
              <p className="text-xs font-bold uppercase text-slate-400">{item.label}</p>
              <p className="mt-2 text-xl font-semibold leading-tight text-brand">{item.value}</p>
            </div>
          ))}
          <div className="rounded-lg border border-brand/15 bg-brand-soft p-4">
            <p className="text-xs font-bold uppercase text-brand">Leitura rápida</p>
            <p className="mt-2 text-sm leading-7 text-brand-deep">
              A série mostra picos pontuais fortes e queda no volume recente, sugerindo oportunidade
              de investigar origem dos picos, cadência comercial e previsibilidade do perpétuo.
            </p>
          </div>
        </aside>
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
        <h3 className="text-2xl font-semibold text-slate-950">Histórico local de diagnósticos</h3>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          Cópias salvas ficam disponíveis neste navegador e podem ser abertas, duplicadas ou excluídas.
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

export default function App() {
  const [activeStage, setActiveStage] = useState(getStageFromHash);
  const [data, setData] = useState(loadCurrentDiagnosis);
  const [savedDiagnoses, setSavedDiagnoses] = useState(loadSavedDiagnoses);
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState("");
  const [saveState, setSaveState] = useState("Salvo localmente");

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
    const handleHashChange = () => setActiveStage(getStageFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const completedFields = useMemo(() => {
    return stages.reduce((total, stage) => total + getFilledFields(data[stage.id] || {}), 0);
  }, [data]);

  const totalFields = stages.length * fieldConfig.length;
  const progress = Math.round((completedFields / totalFields) * 100);
  const currentStage = stages.find((stage) => stage.id === activeStage);
  const isSummary = activeStage === "resumo";
  const publishedDiagnosis = useMemo(() => mergeSavedData(PUBLISHED_DIAGNOSIS), []);
  const reportData = useMemo(
    () => (hasDiagnosisData(data) ? data : publishedDiagnosis),
    [data, publishedDiagnosis]
  );
  const currentSnapshot = useMemo(() => snapshotDiagnosis(data), [data]);
  const hasUnsavedChanges = useMemo(() => {
    if (!hasDiagnosisData(data)) {
      return false;
    }

    const matchesSavedDiagnosis = savedDiagnoses.some(
      (diagnosis) => snapshotDiagnosis(diagnosis.data) === currentSnapshot
    );

    return currentSnapshot !== lastSavedSnapshot && !matchesSavedDiagnosis;
  }, [currentSnapshot, data, lastSavedSnapshot, savedDiagnoses]);

  const consolidated = useMemo(() => buildExecutiveSummary(reportData), [reportData]);

  function navigateTo(stageId) {
    window.location.hash = stageId;
    setActiveStage(stageId);
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
    await navigator.clipboard.writeText(formatSummary(reportData));
    setSaveState("Resumo copiado");
  }

  function saveDiagnostic() {
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

  function exportPdf() {
    window.print();
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
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
          </div>
        </section>
      </aside>

      <section className="lg:pl-80">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/92 px-4 py-4 backdrop-blur md:px-7">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase text-brand">
                  {isSummary ? "Etapa final" : `Etapa ${currentStage.number}`}
                </span>
                <span className="text-xs font-semibold text-slate-500">{saveState}</span>
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                {isSummary ? "Resumo e Diagnóstico" : currentStage.title}
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
            {[...stages, { id: "resumo", number: "R", title: "Resumo" }].map((stage) => (
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
          {!isSummary ? (
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
          ) : (
            <div className="grid gap-5">
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
                      Diagnóstico consolidado da reunião
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
                      O resumo abaixo é gerado automaticamente a partir dos registros das etapas.
                      Edite os campos anteriores para refinar a leitura final antes de salvar ou exportar.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={exportPdf}
                      className="rounded-md bg-brand px-4 py-3 text-sm font-bold text-white shadow-brand hover:bg-brand-deep"
                    >
                      Exportar em PDF
                    </button>
                    <button
                      type="button"
                      onClick={copySummary}
                      className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Copiar resumo completo
                    </button>
                    <button
                      type="button"
                      onClick={saveDiagnostic}
                      className="rounded-md border border-brand/20 bg-brand-soft px-4 py-3 text-sm font-bold text-brand hover:bg-brand/10"
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
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
