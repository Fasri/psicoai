import { useState } from "react";
import {
  Home, Users, CalendarDays, FileText, Search, Plus, X,
  Clock, ChevronRight, Paperclip, ArrowLeft, CheckCircle2,
  Activity, Star, Edit3, Award, BookOpen, Filter, Check,
  FileCheck2, Target, Sliders, UserCheck, ShieldAlert,
  Lightbulb, HeartHandshake, Eye, Sparkles, AlertTriangle, Layers
} from "lucide-react";

/* ---------------------------------------------------------
   TOKENS
--------------------------------------------------------- */
const C = {
  ink: "#1E2A38",
  inkLight: "#2C3D4F",
  paper: "#F6F4EF",
  card: "#FFFFFF",
  textPrimary: "#1E2A38",
  textSecondary: "#5B6B7A",
  border: "#E4E0D4",
  brand: "#2F6F6B",
  brandSoft: "#E7F1EF",
};

const STATUS = {
  baixa: { label: "Estável", color: "#6FA287", bg: "#EDF4EE" },
  media: { label: "Atenção", color: "#C98A08", bg: "#FBF3DE" },
  alta: { label: "Prioritário", color: "#D6543A", bg: "#FBE9E4" },
  encerrado: { label: "Encerrado", color: "#8C97A6", bg: "#EEF0F2" },
};

/* ---------------------------------------------------------
   CATÁLOGO BASE DE ATIVIDADES
--------------------------------------------------------- */
const CATALOGO_ATIVIDADES = [
  { id: "cat-1", titulo: "Treino de Consciência Fonológica e Rima", categoria: "Alfabetização & Leitura", descricao: "Exercícios de identificação de sons, aliteração e manipulação de sílabas." },
  { id: "cat-2", titulo: "Jogo do Sequenciamento Lógico e Temporal", categoria: "Raciocínio Lógico", descricao: "Organização de cartões sequenciais para estruturação do pensamento." },
  { id: "cat-3", titulo: "Treino de Atenção Sustentada e Foco", categoria: "Atenção & Memória", descricao: "Atividades de rastreio visual e caça-símbolos com tempo controlado." },
  { id: "cat-4", titulo: "Motricidade Fina e Grafomotricidade", categoria: "Coordenação Motora", descricao: "Exercícios de traçado, dobradura e preensão para escrita." },
  { id: "cat-5", titulo: "Interpretação Textual Guiada com Imagens", categoria: "Leitura & Escrita", descricao: "Leitura compartilhada com perguntas de inferência e síntese." },
  { id: "cat-6", titulo: "Blocos de Composição Numérica", categoria: "Raciocínio Lógico", descricao: "Manipulação de blocos estruturados para noções de quantidade e cálculo." },
];

/* ---------------------------------------------------------
   MOCK DATA DOS CASOS COM ESTRUTURA REAL DE PEI - AEE
--------------------------------------------------------- */
const CASES_INIT = [
  {
    id: 1,
    nome: "José Robert Henrique dos Santos",
    turma: "6º Ano C (Fund. II)",
    idade: 14,
    profissional: "Gilcilena Leal de Souza (Psicopedagoga/AEE)",
    status: "alta",
    motivo: "Alta dispersão em sala de aula, recusa na escrita manuscrita e crises de desregulação emocional com agressividade.",
    contexto: "Grupo Escolar Edjackson Leocádio. Atendimento AEE na Sala de Recursos Multifuncionais (Tarde, 2x/semana).",
    sessoes: [
      { id: 1, data: "17 jun", tipo: "AEE / Individual", resumo: "Treino com o Cartão do Juiz (amarelo/vermelho). Ótima resposta e engajamento usando a temática de futebol." },
      { id: 2, data: "10 jun", tipo: "Avaliação AEE", resumo: "Aplicação do sistema 'Primeiro / Depois' para permanência na tarefa por 15 minutos." },
    ],
    evolucao: [
      { data: "17 jun", titulo: "PEI Elaborado", texto: "Elaborado o PEI com foco no hiperfoco em Futebol e eliminação de gatilhos atitudinais." },
      { data: "10 jun", titulo: "Caso aberto no AEE", texto: "Encaminhado pela coordenação devido a surtos de raiva diante de contrariedades." },
    ],
    atividades: [
      {
        id: 101,
        titulo: "Construção do Cartão do Juiz e Regras de Futebol",
        categoria: "Socioemocional & Linguagem",
        data: "17 jun",
        nota: 9.0,
        status: "Concluída",
        observacao: "José Robert participou ativamente da criação do cartão amarelo/vermelho para autorregulação da raiva."
      },
      {
        id: 102,
        titulo: "Tracejado de Nomes de Jogadores e Times",
        categoria: "Escrita & Grafomotricidade",
        data: "12 jun",
        nota: 8.0,
        status: "Em Andamento",
        observacao: "Aceitou fazer o traçado manuscrito quando o conteúdo era sobre os times da Copa do Mundo."
      }
    ],
    pei: {
      status: "Ativo",
      dataElaboracao: "17/06/2026",
      ultimaAtualizacao: "17/06/2026",
      responsavel: "Gilcilena Leal de Souza (Psicopedagoga/AEE)",
      escola: "Grupo Escolar Edjackson Leocádio dos Santos",
      atendimentoAee: "Sala de Recursos Multifuncionais - Tarde (2x por semana)",

      // II. Estudo de Caso e Anamnese
      diagnostico: "Transtorno do Espectro do Autismo (TEA) – CID 10: F84.9",
      queixaPrincipal: "Alta dispersão em sala de aula, recusa e dificuldade na escrita manuscrita, crises de quebra de rigidez cognitiva acompanhadas de desregulação emocional severa (explosões de raiva direcionadas a pares e professores).",
      perfilAprendizagem: "Aluno com alto potencial cognitivo (hiperfoco). Aprendizagem predominantemente visual e baseada em incentivos positivos. Demonstra forte desejo interno de aprender, tendo se alfabetizado de forma autodidata.",
      potencialidadesInteresses: "Excelente capacidade de autoalfabetização; demonstra engajamento quando recebe reforço positivo; possui hiperfoco em Futebol.",
      
      barreiras: [
        { tipo: "Cognitiva/Atencional", descricao: "Dispersão acentuada e baixo tempo de permanência nas tarefas acadêmicas tradicionais." },
        { tipo: "Pedagógica", descricao: "Dificuldade no traçado e na transição para a letra manuscrita; barreiras na fluidez da fala e na interpretação sob pressão." },
        { tipo: "Socioemocional", descricao: "Baixíssima tolerância à frustração. Sentimento crônico de raiva e reações físicas agressivas diante de contrariedades." },
        { tipo: "Atitudinal/Identitária", descricao: "Recusa veemente a rótulos. O termo 'especial' atua como um gatilho direto de desregulação para o estudante." }
      ],

      // III. Objetivos Educacionais Individualizados (Metas SMART)
      metas: [
        { id: 1, categoria: "Aprendizagem", prazo: "Curto Prazo (1 a 3 meses)", descricao: "Identificar e grafar as letras do alfabeto em formato manuscrito, inicialmente por exercícios de tracejado e pareamento.", status: "Em Andamento" },
        { id: 2, categoria: "Engajamento", prazo: "Curto Prazo (1 a 3 meses)", descricao: "Ampliar o tempo de retenção e execução em sala regular de 10 para 20 minutos contínuos usando contratos de futebol.", status: "Em Andamento" },
        { id: 3, categoria: "Socioemocional", prazo: "Curto Prazo (1 a 3 meses)", descricao: "Utilizar jogos pedagógicos no AEE para associar fonemas/sílabas exercitando o ganhar e perder no contexto lúdico.", status: "Em Andamento" },
        { id: 4, categoria: "Comunicação", prazo: "Médio Prazo (4 a 6 meses)", descricao: "Desenvolver estratégias de autorregulação verbal ('estou com raiva', 'preciso de um tempo') antes de explodir.", status: "Planejada" },
        { id: 5, categoria: "Escrita", prazo: "Médio Prazo (4 a 6 meses)", descricao: "Escrever de forma autônoma palavras isoladas em escrita manuscrita em contextos significativos (nomes de times/jogadores).", status: "Planejada" },
        { id: 6, categoria: "Autonomia", prazo: "Longo Prazo (Ano Letivo)", descricao: "Escrever pequenas frases completas em letra manuscrita com legibilidade.", status: "Planejada" },
        { id: 7, categoria: "Socialização", prazo: "Longo Prazo (Ano Letivo)", descricao: "Participar de forma mais colaborativa e pacífica das aulas do 6º ano, aceitando a mediação sem episódios de violência.", status: "Planejada" }
      ],

      // IV. Adequações e Estratégias Metodológicas
      manejoAtitudinal: "Proibir terminantemente o uso do termo 'especial' ou qualquer infantilização pela equipe escolar. Tratá-lo de acordo com sua idade cronológica (14 anos), focando na autonomia.",
      estrategiaHiperfoco: "Futebol: Utilizar tabelas de campeonatos, textos sobre jogadores, pontuações e regras de futebol para contextualizar exercícios de alfabetização e escrita manuscrita.",
      flexibilizacaoBncc: "Fragmentar as tarefas em passos curtos e entregar as instruções de forma pausada (uma ordem de cada vez). Utilizar suportes visuais e vídeos curtos explicativos.",
      suporteSocioemocional: "Quadros de rotina visual previsível para diminuição da ansiedade de transição. Criar o sistema 'Primeiro / Depois' (ex: 'Primeiro 10 min de escrita manuscrita, depois 5 min de leitura sobre futebol').",
      recursosAcessibilidade: "Visualizador de tarefas 'Primeiro/Depois', organizadores gráficos visuais e cronômetro visual.",
      adaptacoesAvaliativas: "Avaliações com apoio de imagens, formato reduzido de questões por página, tempo estendido e ambiente reservado na sala do AEE com a psicopedagoga.",

      // V. Acompanhamento e Diretrizes Éticas
      instrumentosRegistro: "Acompanhamento e relatório diário de evolução das atividades e do comportamento feito pela psicopedagoga na sala de recursos.",
      articulacaoMultidisciplinar: "Reuniões pedagógicas periódicas entre o AEE e professores regentes do Ensino Fundamental II. Alinhamento contínuo com a família para controle de frustração no lar.",

      // 💡 DICA DA PSICOPEDAGOGA
      dicaPsicopedagoga: "Como o José Robert tem o sentimento de raiva muito presente, construa junto com ele no AEE o 'Cartão do Juiz' (Cartão Amarelo/Vermelho). Combine que o cartão amarelo é o aviso visual de que ele está 'esquentando' e precisa beber água ou respirar, dando a ele o controle da situação antes que vire uma agressão física (cartão vermelho)."
    },
    relatorios: [{ id: 1, titulo: "Relatório Inicial do AEE", status: "finalizado", data: "17 jun" }],
    anexos: [{ nome: "PEI_Oficial_Jose_Robert.pdf", data: "17 jun" }],
  },
  {
    id: 2,
    nome: "Ana Vitória da Silva Santos",
    turma: "7º Ano B (Fund. II)",
    idade: 13,
    profissional: "Gilcilena Leal de Souza (Psicopedagoga/AEE)",
    status: "media",
    motivo: "Déficit severo de atenção, esquecimento de comandos recentes (memória de trabalho) e escrita copista sem codificação espontânea.",
    contexto: "Grupo Escolar Edjackson Leocádio. Atendimento AEE na Sala de Recursos (Tarde, 2x/semana).",
    sessoes: [
      { id: 1, data: "17 jun", tipo: "AEE / Individual", resumo: "Aplicação da técnica de Cópia Retardada e uso da mini rotina visual de chaveiro." },
    ],
    evolucao: [{ data: "17 jun", titulo: "PEI Elaborado", texto: "Plano focado em oralidade e superação do comportamento copista." }],
    atividades: [
      {
        id: 201,
        titulo: "Técnica de Cópia Retardada com Palavras Simples",
        categoria: "Leitura & Escrita",
        data: "17 jun",
        nota: 8.5,
        status: "Concluída",
        observacao: "Ana Vitória leu a palavra em voz alta, cobriu o modelo e conseguiu escrever de memória recente."
      }
    ],
    pei: {
      status: "Ativo",
      dataElaboracao: "17/06/2026",
      ultimaAtualizacao: "17/06/2026",
      responsavel: "Gilcilena Leal de Souza (Psicopedagoga/AEE)",
      escola: "Grupo Escolar Edjackson Leocádio dos Santos",
      atendimentoAee: "Sala de Recursos Multifuncionais - Tarde (2x por semana)",

      diagnostico: "Transtornos Globais do Desenvolvimento (TGD)",
      queixaPrincipal: "Déficit severo de atenção, esquecimento de comandos e fatos recentes (comprometimento da memória de trabalho), comportamento esquivo das atividades escolares e dificuldade de permanência em sala.",
      perfilAprendizagem: "Aluna extremamente comunicativa e verbal. Aprende melhor através do canal auditivo e da interação oral. Apresenta excelente desenvolvimento motor e boa preensão do lápis.",
      potencialidadesInteresses: "Sociável, não apresenta traços de agressividade, possui facilidade para dialogar e expressa o desejo explícito de aprender a ler e a escrever em formato manuscrito.",
      
      barreiras: [
        { tipo: "Cognitiva", descricao: "Perda rápida de informações recentes (memória de trabalho) e alta dispersão na sala de aula comum." },
        { tipo: "Pedagógica", descricao: "Dependência exclusiva do suporte visual direto para registrar palavras (escrita copista), sem codificação fonética espontânea." },
        { tipo: "Comportamental", descricao: "Comportamento de recusa ativa diante de tarefas longas ou complexas como defesa contra a frustração." }
      ],

      metas: [
        { id: 1, categoria: "Transição Gráfica", prazo: "Curto Prazo (1 a 3 meses)", descricao: "Converter letras bastão para formato manuscrito a partir de pequenos modelos de cópia com até duas palavras.", status: "Em Andamento" },
        { id: 2, categoria: "Memória de Trabalho", prazo: "Curto Prazo (1 a 3 meses)", descricao: "Reter e executar instruções diretas de até dois comandos sequenciais utilizando apoios visuais rápidos.", status: "Em Andamento" },
        { id: 3, categoria: "Permanência", prazo: "Curto Prazo (1 a 3 meses)", descricao: "Permanecer engajada em tarefas por 15 minutos contínuos usando reforçadores verbais imediatos.", status: "Em Andamento" },
        { id: 4, categoria: "Alfabetização", prazo: "Médio Prazo (4 a 6 meses)", descricao: "Romper o comportamento copista, escrevendo palavras simples de forma ditada sem olhar para a palavra modelo.", status: "Planejada" },
        { id: 5, categoria: "Foco", prazo: "Médio Prazo (4 a 6 meses)", descricao: "Utilizar organizadores gráficos visuais simples para lembrar a sequência das atividades do dia.", status: "Planejada" },
        { id: 6, categoria: "Autonomia", prazo: "Longo Prazo (Ano Letivo)", descricao: "Ler e escrever de forma manuscrita pequenas frases com autonomia e compreensão.", status: "Planejada" }
      ],

      manejoAtitudinal: "Acolhimento e incentivo verbal constante. Desmistificar com a equipe a ideia de 'preguiça', pontuando que a recusa é gerada pela dificuldade de memória de trabalho.",
      estrategiaHiperfoco: "Valorização da Oralidade: Como fala muito bem, introduzir e avaliar os conteúdos prioritariamente pela via oral (explicando falado em vez de textos escritos extensos).",
      flexibilizacaoBncc: "Reduzir drasticamente o volume de cópia da lousa. Entregar textos longos impressos e fracionar as tarefas em etapas pequenas (entregar uma questão por vez).",
      suporteSocioemocional: "Uso obrigatório de mini rotina visual na mesa (chaveiro de rotina) sinalizando o passo a passo da aula. Estratégia 'Primeiro / Depois' para quebrar recusa.",
      recursosAcessibilidade: "Cartão de rotina visual fixado na carteira, organizadores visuais gráficos e fichas de 'Cópia Retardada'.",
      adaptacoesAvaliativas: "Avaliações com enunciados curtos, suporte de imagens e aplicação oral pelos professores regentes ou na sala de recursos do AEE.",

      instrumentosRegistro: "Relatório diário de atendimento no AEE focado na evolução da escrita manuscrita espontânea (sem apoio de cópia).",
      articulacaoMultidisciplinar: "Reuniões com a equipe do 7º ano para alinhamento pedagógico e desmistificação da recusa escolar.",

      dicaPsicopedagoga: "Aproveite que a Ana Vitória tem excelente coordenação motora fina para trabalhar com letras cursivas de lixa (texturizadas) ou caixa de areia antes do papel. Como ela quer muito aprender manuscrito, passear com o dedo indicador sobre a textura cria uma memória muscular cinestésica forte, ajudando a fixar o traçado que a memória recente dela costuma esquecer."
    },
    relatorios: [],
    anexos: [],
  },
  {
    id: 3,
    nome: "Victor Natanael Sales da Silva",
    turma: "7º Ano (Fund. II)",
    idade: 12,
    profissional: "Gilcilena Leal de Souza (Psicopedagoga/AEE)",
    status: "media",
    motivo: "Ausência de leitura fluente, barreiras severas na escrita autônoma e fala pouco desenvolvida.",
    contexto: "Grupo Escolar Edjackson Leocádio. Atendimento AEE na Sala de Recursos Multifuncionais (Tarde, 2x/semana com apoio).",
    sessoes: [
      { id: 1, data: "18 jun", tipo: "AEE / Individual", resumo: "Uso da Prancha Visual de Sentimentos no início do atendimento. Aluno respondeu com docilidade." },
    ],
    evolucao: [{ data: "18 jun", titulo: "PEI Elaborado", texto: "Elaborado PEI focado em Comunicação Alternativa e suporte visual." }],
    atividades: [
      {
        id: 301,
        titulo: "Pareamento de Vogais com Método Fônico Visossuportado",
        categoria: "Alfabetização & Leitura",
        data: "18 jun",
        nota: 8.0,
        status: "Concluída",
        observacao: "Victor reconheceu visualmente as vogais associadas a figuras concretas."
      }
    ],
    pei: {
      status: "Ativo",
      dataElaboracao: "18/06/2026",
      ultimaAtualizacao: "18/06/2026",
      responsavel: "Gilcilena Leal de Souza (Psicopedagoga/AEE)",
      escola: "Grupo Escolar Edjackson Leocádio dos Santos",
      atendimentoAee: "Sala de Recursos Multifuncionais - Tarde (2x por semana)",

      diagnostico: "Transtornos Globais do Desenvolvimento (TGD) e Deficiências Múltiplas",
      queixaPrincipal: "Ausência de leitura fluente, barreiras severas na escrita autônoma, fala pouco desenvolvida e dificuldade acentuada de expressar pensamentos, sentimentos e necessidades.",
      perfilAprendizagem: "Aluno com perfil predominantemente visual. Responde muito bem a estímulos concretos, imagens e ambientes tranquilos. Ritmo de aprendizagem processual.",
      potencialidadesInteresses: "Estudante muito calmo, dócil, não apresenta comportamentos agressivos e demonstra abertura para o vínculo pedagógico, mesmo sendo reservado.",
      
      barreiras: [
        { tipo: "Comunicação", descricao: "Expressão verbal bastante restrita e timidez/isolamento na comunicação." },
        { tipo: "Pedagógica", descricao: "Não lê de forma convencional e apresenta dificuldades motoras ou cognitivas para estruturar a escrita de palavras sem suporte." },
        { tipo: "Socioemocional", descricao: "Dificuldade em externalizar sentimentos, o que pode gerar retraimento por não conseguir se fazer entender." }
      ],

      metas: [
        { id: 1, categoria: "Comunicação", prazo: "Curto Prazo (1 a 3 meses)", descricao: "Identificar e nomear emoções básicas (alegria, tristeza, cansaço, frustração) utilizando a Prancha Visual de Sentimentos.", status: "Em Andamento" },
        { id: 2, categoria: "Leitura", prazo: "Curto Prazo (1 a 3 meses)", descricao: "Reconhecer visualmente e parear vogais e sílabas iniciais simples com suporte de imagens (Método Fônico Visossuportado).", status: "Em Andamento" },
        { id: 3, categoria: "Escrita", prazo: "Curto Prazo (1 a 3 meses)", descricao: "Realizar o traçado de letras e palavras de seu interesse utilizando recursos de textura (letras de lixa, massinha).", status: "Em Andamento" },
        { id: 4, categoria: "Diálogo", prazo: "Médio Prazo (4 a 6 meses)", descricao: "Ampliar respostas verbais ou sinalizadas a partir de perguntas diretas sobre como se sente.", status: "Planejada" },
        { id: 5, categoria: "Autonomia", prazo: "Longo Prazo (Ano Letivo)", descricao: "Construir pequenas frases escritas com autonomia e ler enunciados curtos com apoio de pictogramas.", status: "Planejada" }
      ],

      manejoAtitudinal: "Acolhimento afetivo nos primeiros 5 minutos de atendimento sem cobrança acadêmica. Garantir que as ordens sejam dadas individualmente, de forma calma e curta, olhando nos olhos do aluno.",
      estrategiaHiperfoco: "Abordagem por Etapas Flexíveis: Sondagem rápida no AEE; se responder bem, avança a complexidade; se travar, simplifica a atividade na hora com apoio de imagens.",
      flexibilizacaoBncc: "Substituir textos puramente teóricos por infográficos, esquemas visuais, vídeos ilustrativos e mapas conceituais baseados em imagens.",
      suporteSocioemocional: "Implementar Prancha de Comunicação e Sentimentos na mesa. Como fala pouco, aponta imagens para dizer se entendeu, se precisa ir ao banheiro ou se está cansado.",
      recursosAcessibilidade: "Prancha de comunicação alternativa (Alta Prioridade), letras de lixa, massinha e engrossadores de lápis.",
      adaptacoesAvaliativas: "Avaliações no 7º ano totalmente adaptadas em formato de múltipla escolha com imagens explicativas ou aplicadas oralmente na sala do AEE.",

      instrumentosRegistro: "Folha de evolução diária anotando não apenas o erro/acerto, mas o nível de suporte necessário ('sozinho', 'com ajuda visual', 'apoio físico').",
      articulacaoMultidisciplinar: "Reuniões periódicas com a equipe do 7º ano para readequação constante do plano.",

      dicaPsicopedagoga: "Como o Victor é muito calmo e pouco comunicativo, o pior cenário é o silêncio da invisibilidade na sala de aula. Use a técnica do 'Parceiro de Conversa': eleja um colega de sala acolhedor para fazer dupla com ele em dinâmicas visuais simples, estimulando a fala por vias sociais e afetivas sem a pressão do adulto cobrando resposta."
    },
    relatorios: [],
    anexos: [],
  },
  {
    id: 4,
    nome: "Luis Fernando da Silva",
    turma: "7º Ano (Fund. II)",
    idade: 12,
    profissional: "Gilcilena Leal de Souza (Psicopedagoga/AEE)",
    status: "alta",
    motivo: "Comportamento opositor e de enfrentamento com autoridades, recusa sistemática de comandos e fala prejudicada por questão dentária.",
    contexto: "Grupo Escolar Edjackson Leocádio. Atendimento AEE (Tarde, 2x/semana).",
    sessoes: [
      { id: 1, data: "18 jun", tipo: "AEE / Individual", resumo: "Aplicação do 'Contrato de Convivência' e checagem do termômetro de humor." },
    ],
    evolucao: [{ data: "18 jun", titulo: "PEI Elaborado", texto: "Plano focado em manejo comportamental não violento e contrato de trocas." }],
    atividades: [
      {
        id: 401,
        titulo: "Checagem do Termômetro do Humor e Negociação Verbal",
        categoria: "Socioemocional & Linguagem",
        data: "18 jun",
        nota: 8.5,
        status: "Concluída",
        observacao: "Luis Fernando apontou o humor no termômetro e cumpriu o acordo de 10 min de atividade em troca de tempo de computador."
      }
    ],
    pei: {
      status: "Ativo",
      dataElaboracao: "18/06/2026",
      ultimaAtualizacao: "18/06/2026",
      responsavel: "Gilcilena Leal de Souza (Psicopedagoga/AEE)",
      escola: "Grupo Escolar Edjackson Leocádio dos Santos",
      atendimentoAee: "Sala de Recursos Multifuncionais - Tarde (2x por semana)",

      diagnostico: "Transtorno Desafiador Opositor (TOD - CID 10: F91.3) e Deficiência Mental Moderada (CID 10: F71.1)",
      queixaPrincipal: "Recusa sistemática em seguir comandos, comportamento opositor e de enfrentamento com figuras de autoridade, desorganização emocional seguida de agressividade física/verbal, ausência de leitura e escrita convencional.",
      perfilAprendizagem: "Aluno com perfil predominantemente verbal e auditivo. Beneficia-se de metodologias expositivas e dinâmicas baseadas na fala. Responde positivamente a sistemas de recompensa e contratos prévios.",
      potencialidadesInteresses: "Boa capacidade de engajamento quando se sente respeitado e integrado em acordos; boa compreensão de dinâmicas de trocas e benefícios; potencial para atividades expositivas e orais.",
      
      barreiras: [
        { tipo: "Comportamental/TOD", descricao: "Intolerância a ordens diretas, inflexibilidade cognitiva e comportamento de contradição sistemática ('bater de frente')." },
        { tipo: "Comunicação/Fala", descricao: "Fala prejudicada e de difícil compreensão devido à ausência de elementos dentários, gerando o sentimento de ser 'mal compreendido' e engatilhando frustração." },
        { tipo: "Pedagógica", descricao: "Não lê convencionalmente e apresenta severas barreiras no registro escrito." },
        { tipo: "Atencional", descricao: "Baixa concentração em tarefas que exigem esforço cognitivo puramente focado no papel." }
      ],

      metas: [
        { id: 1, categoria: "Comportamental", prazo: "Curto Prazo (1 a 3 meses)", descricao: "Cumprir o 'Contrato de Convivência' (permanecer na sala sem enfrentar o professor) em 70% das aulas da semana.", status: "Em Andamento" },
        { id: 2, categoria: "Comunicação", prazo: "Curto Prazo (1 a 3 meses)", descricao: "Utilizar fala pausada ou apoio de digitação no AEE para minimizar frustração por não ser compreendido.", status: "Em Andamento" },
        { id: 3, categoria: "Alfabetização", prazo: "Curto Prazo (1 a 3 meses)", descricao: "Associar sons a letras (consciência fonológica) por meio de jogos verbais e expositivos no AEE.", status: "Em Andamento" },
        { id: 4, categoria: "Autorregulação", prazo: "Médio Prazo (4 a 6 meses)", descricao: "Identificar o momento de desorganização e pedir para ir ao AEE ou tomar água em vez de explodir com colegas.", status: "Planejada" },
        { id: 5, categoria: "Autonomia", prazo: "Longo Prazo (Ano Letivo)", descricao: "Escrever pequenas frases e participar de apresentações/debates orais do 7º ano com suporte verbal.", status: "Planejada" }
      ],

      manejoAtitudinal: "Manejo Comportamental Obrigatório (Não bater de frente): NUNCA dar ordens diretas ou imperativas ('Faça isso agora!'). Substituir por opções de escolha com falsa autonomia (ex: 'Luis, prefere fazer a lápis ou a caneta?' / 'Prefere a questão 1 ou 2 primeiro?'). Se ele recusar, não prolongar a discussão; manter a calma e apontar o contrato de forma neutra.",
      estrategiaHiperfoco: "Metodologias Ativas e Expositoras (Foco no Verbal): Incluí-lo em seminários, debates e rodas de conversa onde a avaliação do aprendizado seja feita pela exposição oral de suas ideias.",
      flexibilizacaoBncc: "Utilizar recursos de áudio, vídeos e explicações interativas antes de propor registro no papel.",
      suporteSocioemocional: "Contrato de Convivência e Economia de Fichas (créditos por cumprir metas para usar computador ou liderar atividade).",
      recursosAcessibilidade: "Cartão visual de acordos diários, sistema de fichas/créditos e áudios interativos.",
      adaptacoesAvaliativas: "Atividades e avaliações adaptadas escalonadas; monitoramento de crises e alinhamento para não gritar ou peitar o aluno em momentos de desorganização.",

      instrumentosRegistro: "Registro diário no AEE dos episódios de agressividade para identificar matérias ou gatilhos da desorganização.",
      articulacaoMultidisciplinar: "Recomendação forte para articulação com a família buscando tratamento odontológico/fonoaudiológico para recolocação dos dentes, impactando diretamente na melhora da fala e autoimagem.",

      dicaPsicopedagoga: "No início de cada atendimento no AEE, faça uma 'checagem do termômetro'. Use o desenho de um termômetro e peça para ele apontar como está o humor dele. Se ele apontar que está com a raiva alta, gaste os primeiros minutos em uma atividade expositiva verbal que ele goste (deixar ele falar livremente) para desarmar o comportamento opositor antes de exigir o treino de escrita."
    },
    relatorios: [],
    anexos: [],
  },
];

const AGENDA_HOJE = [
  { hora: "08:30", nome: "Luis Fernando da Silva", tipo: "Sessão individual / AEE", caseId: 4 },
  { hora: "10:00", nome: "Ana Vitória da Silva Santos", tipo: "Avaliação psicopedagógica", caseId: 2 },
  { hora: "13:30", nome: "José Robert Henrique dos Santos", tipo: "Atendimento AEE", caseId: 1 },
  { hora: "15:00", nome: "Victor Natanael Sales da Silva", tipo: "Comunicação Alternativa AEE", caseId: 3 },
];

/* ---------------------------------------------------------
   SMALL PIECES & HELPERS
--------------------------------------------------------- */
function Badge({ status }) {
  const s = STATUS[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
      {s.label}
    </span>
  );
}

function NotaBadge({ nota }) {
  let bg = "#EDF4EE";
  let color = "#2F6F6B";

  if (nota < 6.0) {
    bg = "#FBE9E4";
    color = "#D6543A";
  } else if (nota < 8.0) {
    bg = "#FBF3DE";
    color = "#C98A08";
  }

  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold font-mono"
      style={{ backgroundColor: bg, color: color }}
    >
      <Star size={13} fill={color} color={color} />
      Nota: {nota.toFixed(1)}
    </span>
  );
}

function CaseCard({ c, onOpen }) {
  const s = STATUS[c.status];
  return (
    <button
      onClick={() => onOpen(c.id)}
      className="w-full text-left rounded-lg overflow-hidden flex hover:shadow-md transition-shadow"
      style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}
    >
      <div className="w-1.5" style={{ backgroundColor: s.color }} />
      <div className="flex-1 p-4 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold" style={{ color: C.textPrimary, fontFamily: "'Fraunces', serif" }}>{c.nome}</p>
          <p className="text-sm mt-0.5" style={{ color: C.textSecondary }}>
            {c.turma} • {c.idade} anos • {c.profissional}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Badge status={c.status} />
          <ChevronRight size={18} color={C.textSecondary} />
        </div>
      </div>
    </button>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="rounded-lg p-4 flex-1 min-w-[140px]" style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
      <p className="text-xs uppercase tracking-wide font-mono" style={{ color: C.textSecondary }}>{label}</p>
      <p className="text-3xl mt-1 font-semibold" style={{ color: color || C.ink, fontFamily: "'Fraunces', serif" }}>{value}</p>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors"
      style={{
        backgroundColor: active ? C.inkLight : "transparent",
        color: active ? "#FFFFFF" : "#B7C2CC",
      }}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        {label}
      </div>
      {badge && (
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: C.brand, color: "#FFFFFF" }}>
          {badge}
        </span>
      )}
    </button>
  );
}

/* ---------------------------------------------------------
   VIEWS
--------------------------------------------------------- */
function Dashboard({ cases, onOpenCase, onGoTo }) {
  const ativos = cases.filter((c) => c.status !== "encerrado").length;
  const prioritarios = cases.filter((c) => c.status === "alta").length;
  const relatoriosPendentes = cases.reduce(
    (acc, c) => acc + c.relatorios.filter((r) => r.status === "rascunho").length, 0
  );
  const totalAtividades = cases.reduce((acc, c) => acc + (c.atividades ? c.atividades.length : 0), 0);
  const emAtencao = [...cases]
    .filter((c) => c.status === "alta" || c.status === "media")
    .sort((a, b) => (a.status === "alta" ? -1 : 1));

  return (
    <div className="max-w-5xl">
      <p style={{ color: C.textSecondary }}>Segunda-feira, 24 de agosto</p>
      <h1 className="text-3xl mt-1" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: C.ink }}>
        Painel Psicopedagógico & AEE
      </h1>

      <div className="flex flex-wrap gap-3 mt-6">
        <StatCard label="Casos ativos" value={ativos} />
        <StatCard label="Atendimentos hoje" value={AGENDA_HOJE.length} />
        <StatCard label="Atividades no AEE" value={totalAtividades} color={C.brand} />
        <StatCard label="Prioritários" value={prioritarios} color="#D6543A" />
        <StatCard label="Relatórios pendentes" value={relatoriosPendentes} color="#C98A08" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: C.ink }}>Agenda de hoje</h2>
            <button onClick={() => onGoTo("agenda")} className="text-sm font-medium" style={{ color: C.brand }}>ver tudo</button>
          </div>
          <div className="rounded-lg" style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
            {AGENDA_HOJE.map((a, i) => (
              <div
                key={i}
                onClick={() => a.caseId && onOpenCase(a.caseId)}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors"
                style={{ borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}
              >
                <span className="text-sm w-14 shrink-0 font-mono" style={{ color: C.textSecondary }}>{a.hora}</span>
                <div>
                  <p className="text-sm font-medium" style={{ color: C.textPrimary }}>{a.nome}</p>
                  <p className="text-xs" style={{ color: C.textSecondary }}>{a.tipo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: C.ink }}>Precisam de atenção</h2>
            <button onClick={() => onGoTo("casos")} className="text-sm font-medium" style={{ color: C.brand }}>ver todos</button>
          </div>
          <div className="flex flex-col gap-2">
            {emAtencao.map((c) => (
              <CaseCard key={c.id} c={c} onOpen={onOpenCase} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Casos({ cases, onOpenCase }) {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todos");

  const filtrados = cases.filter((c) => {
    const matchBusca = c.nome.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtro === "todos" || c.status === filtro;
    return matchBusca && matchStatus;
  });

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: C.ink }}>Casos em Acompanhamento</h1>

      <div className="flex flex-wrap items-center gap-3 mt-5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-md flex-1 min-w-[200px]" style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
          <Search size={16} color={C.textSecondary} />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome do aluno..."
            className="text-sm outline-none w-full bg-transparent"
            style={{ color: C.textPrimary }}
          />
        </div>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="text-sm px-3 py-2 rounded-md outline-none"
          style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, color: C.textPrimary }}
        >
          <option value="todos">Todos os status</option>
          <option value="alta">Prioritário</option>
          <option value="media">Atenção</option>
          <option value="baixa">Estável</option>
          <option value="encerrado">Encerrado</option>
        </select>
        <button
          className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-md text-white font-medium"
          style={{ backgroundColor: C.brand }}
        >
          <Plus size={16} /> Novo caso
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {filtrados.map((c) => (
          <CaseCard key={c.id} c={c} onOpen={onOpenCase} />
        ))}
        {filtrados.length === 0 && (
          <div className="p-8 text-center rounded-lg" style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
            <p className="text-sm" style={{ color: C.textSecondary }}>Nenhum caso encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   VISÃO DE ATIVIDADES GLOBAIS & CATÁLOGO
--------------------------------------------------------- */
function AtividadesView({ cases, onOpenCase, onAddAtividade }) {
  const [abaInterna, setAbaInterna] = useState("historico");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id || 1);
  const [selectedCat, setSelectedCat] = useState(CATALOGO_ATIVIDADES[0]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [nota, setNota] = useState(8.5);
  const [statusAtiv, setStatusAtiv] = useState("Concluída");
  const [observacao, setObservacao] = useState("");

  const todasAtividades = cases.flatMap((c) =>
    (c.atividades || []).map((a) => ({ ...a, aluno: c.nome, caseId: c.id, turma: c.turma }))
  );

  const filtradas = todasAtividades.filter(
    (a) => filtroCategoria === "todas" || a.categoria === filtroCategoria
  );

  const categorias = Array.from(new Set(CATALOGO_ATIVIDADES.map((c) => c.categoria)));

  const handleAtribuir = () => {
    if (!selectedCaseId || !selectedCat) return;
    onAddAtividade(selectedCaseId, {
      titulo: selectedCat.titulo,
      categoria: selectedCat.categoria,
      nota: parseFloat(nota),
      status: statusAtiv,
      observacao: observacao || "Atividade atribuída a partir do catálogo.",
      data: "Hoje"
    });
    setShowAssignModal(false);
    setObservacao("");
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: C.ink }}>
            Sessão de Atividades
          </h1>
          <p className="text-sm mt-1" style={{ color: C.textSecondary }}>
            Gerencie o catálogo de intervenções psicopedagógicas e acompanhe o desempenho dos alunos.
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-6 border-b" style={{ borderColor: C.border }}>
        <button
          onClick={() => setAbaInterna("historico")}
          className="pb-2.5 px-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2"
          style={{
            borderBottomColor: abaInterna === "historico" ? C.brand : "transparent",
            color: abaInterna === "historico" ? C.brand : C.textSecondary,
          }}
        >
          <Activity size={16} /> Histórico de Atividades Aplicadas ({todasAtividades.length})
        </button>
        <button
          onClick={() => setAbaInterna("catalogo")}
          className="pb-2.5 px-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2"
          style={{
            borderBottomColor: abaInterna === "catalogo" ? C.brand : "transparent",
            color: abaInterna === "catalogo" ? C.brand : C.textSecondary,
          }}
        >
          <BookOpen size={16} /> Catálogo de Intervenções ({CATALOGO_ATIVIDADES.length})
        </button>
      </div>

      {abaInterna === "historico" && (
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter size={16} color={C.textSecondary} />
            <span className="text-sm font-medium" style={{ color: C.textSecondary }}>Filtrar por Categoria:</span>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="text-sm px-3 py-1.5 rounded-md outline-none"
              style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, color: C.textPrimary }}
            >
              <option value="todas">Todas as categorias</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtradas.map((a, idx) => (
              <div
                key={idx}
                onClick={() => onOpenCase(a.caseId)}
                className="rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow flex flex-col justify-between"
                style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ backgroundColor: C.brandSoft, color: C.brand }}>
                      {a.categoria}
                    </span>
                    <NotaBadge nota={a.nota} />
                  </div>
                  <h3 className="font-semibold text-base" style={{ color: C.textPrimary, fontFamily: "'Fraunces', serif" }}>
                    {a.titulo}
                  </h3>
                  <p className="text-xs mt-1 font-medium" style={{ color: C.brand }}>
                    Aluno(a): {a.aluno} ({a.turma}) • <span style={{ color: C.textSecondary }}>{a.data}</span>
                  </p>
                  <p className="text-sm mt-3 p-2.5 rounded text-slate-700 italic" style={{ backgroundColor: C.paper, borderLeft: `3px solid ${C.brand}` }}>
                    "{a.observacao}"
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t flex justify-end" style={{ borderColor: C.border }}>
                  <span className="text-xs font-medium flex items-center gap-1" style={{ color: C.brand }}>
                    Ver ficha do aluno <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {abaInterna === "catalogo" && (
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CATALOGO_ATIVIDADES.map((cat) => (
              <div
                key={cat.id}
                className="rounded-lg p-5 flex flex-col justify-between"
                style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}
              >
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: C.brandSoft, color: C.brand }}>
                    {cat.categoria}
                  </span>
                  <h3 className="font-semibold text-lg mt-2" style={{ color: C.textPrimary, fontFamily: "'Fraunces', serif" }}>
                    {cat.titulo}
                  </h3>
                  <p className="text-sm mt-2" style={{ color: C.textSecondary }}>
                    {cat.descricao}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCat(cat);
                    setShowAssignModal(true);
                  }}
                  className="mt-5 w-full py-2 px-3 rounded-md text-sm font-medium flex items-center justify-center gap-1.5 text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: C.brand }}
                >
                  <Plus size={15} /> Atribuir a Aluno
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAssignModal && selectedCat && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="rounded-lg p-6 max-w-lg w-full shadow-xl" style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" style={{ fontFamily: "'Fraunces', serif", color: C.ink }}>
                Incluir Atividade no Caso
              </h2>
              <button onClick={() => setShowAssignModal(false)} className="p-1 rounded hover:bg-slate-100">
                <X size={18} color={C.textSecondary} />
              </button>
            </div>

            <div className="p-3 rounded mb-4" style={{ backgroundColor: C.brandSoft }}>
              <p className="text-xs uppercase font-bold" style={{ color: C.brand }}>{selectedCat.categoria}</p>
              <p className="text-base font-semibold" style={{ color: C.textPrimary }}>{selectedCat.titulo}</p>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs uppercase font-mono block mb-1" style={{ color: C.textSecondary }}>Selecione o Aluno/Caso</label>
                <select
                  value={selectedCaseId}
                  onChange={(e) => setSelectedCaseId(Number(e.target.value))}
                  className="w-full text-sm px-3 py-2 rounded-md outline-none"
                  style={{ backgroundColor: C.paper, border: `1px solid ${C.border}`, color: C.textPrimary }}
                >
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome} - {c.turma} ({c.profissional})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase font-mono block mb-1" style={{ color: C.textSecondary }}>Nota (0 a 10)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    className="w-full text-sm px-3 py-2 rounded-md outline-none font-bold font-mono"
                    style={{ backgroundColor: C.paper, border: `1px solid ${C.border}`, color: C.brand }}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-mono block mb-1" style={{ color: C.textSecondary }}>Status</label>
                  <select
                    value={statusAtiv}
                    onChange={(e) => setStatusAtiv(e.target.value)}
                    className="w-full text-sm px-3 py-2 rounded-md outline-none"
                    style={{ backgroundColor: C.paper, border: `1px solid ${C.border}`, color: C.textPrimary }}
                  >
                    <option>Concluída</option>
                    <option>Em Andamento</option>
                    <option>Planejada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-mono block mb-1" style={{ color: C.textSecondary }}>Observação Psicopedagógica</label>
                <textarea
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  placeholder="Escreva apontamentos sobre a resposta do aluno, facilidades e pontos de atenção..."
                  rows={3}
                  className="w-full text-sm px-3 py-2 rounded-md outline-none resize-none"
                  style={{ backgroundColor: C.paper, border: `1px solid ${C.border}`, color: C.textPrimary }}
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 text-sm rounded-md hover:bg-slate-100"
                  style={{ color: C.textSecondary }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAtribuir}
                  className="px-4 py-2 text-sm rounded-md font-medium text-white flex items-center gap-1.5 hover:opacity-90"
                  style={{ backgroundColor: C.brand }}
                >
                  <CheckCircle2 size={16} /> Salvar no Caso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Agenda({ cases, onOpenCase }) {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: C.ink }}>Agenda de Atendimentos</h1>
      <div className="rounded-lg mt-5" style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}>
        {AGENDA_HOJE.map((a, i) => (
          <div
            key={i}
            onClick={() => a.caseId && onOpenCase(a.caseId)}
            className="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
            style={{ borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}
          >
            <div className="flex items-center gap-2 w-20 shrink-0" style={{ color: C.brand }}>
              <Clock size={15} />
              <span className="text-sm font-mono">{a.hora}</span>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: C.textPrimary }}>{a.nome}</p>
              <p className="text-xs" style={{ color: C.textSecondary }}>{a.tipo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Relatorios({ cases, onOpenCase }) {
  const todos = cases.flatMap((c) => c.relatorios.map((r) => ({ ...r, aluno: c.nome, caseId: c.id })));
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: C.ink }}>Relatórios Emitidos</h1>
      <div className="flex flex-col gap-2 mt-5">
        {todos.map((r, i) => (
          <div
            key={i}
            onClick={() => onOpenCase(r.caseId)}
            className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow"
            style={{ backgroundColor: C.card, border: `1px solid ${C.border}` }}
          >
            <div className="flex items-center gap-3">
              <FileText size={18} color={C.brand} />
              <div>
                <p className="text-sm font-medium" style={{ color: C.textPrimary }}>{r.titulo}</p>
                <p className="text-xs" style={{ color: C.textSecondary }}>{r.aluno} • {r.data}</p>
              </div>
            </div>
            <span
              className="text-xs px-2 py-1 rounded-full font-medium"
              style={{
                backgroundColor: r.status === "finalizado" ? "#EDF4EE" : "#FBF3DE",
                color: r.status === "finalizado" ? "#6FA287" : "#C98A08",
              }}
            >
              {r.status === "finalizado" ? "Finalizado" : "Rascunho"}
            </span>
          </div>
        ))}
        {todos.length === 0 && <p className="text-sm" style={{ color: C.textSecondary }}>Nenhum relatório emitido ainda.</p>}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   COMPONENTE COMPLETO DA ABA PEI (PLANO EDUCACIONAL INDIVIDUALIZADO - AEE)
--------------------------------------------------------- */
function PeiSection({ caseId, pei, onUpdatePei }) {
  const [isEditing, setIsEditing] = useState(false);
  const [subTab, setSubTab] = useState("identificacao"); // "identificacao" | "anamnese" | "metas" | "estrategias" | "acompanhamento"

  // Estado dos Campos do PEI
  const [diagnostico, setDiagnostico] = useState(pei?.diagnostico || "");
  const [queixaPrincipal, setQueixaPrincipal] = useState(pei?.queixaPrincipal || "");
  const [perfilAprendizagem, setPerfilAprendizagem] = useState(pei?.perfilAprendizagem || "");
  const [potencialidades, setPotencialidades] = useState(pei?.potencialidadesInteresses || "");
  const [statusPei, setStatusPei] = useState(pei?.status || "Ativo");
  const [escola, setEscola] = useState(pei?.escola || "");
  const [atendimentoAee, setAtendimentoAee] = useState(pei?.atendimentoAee || "");
  const [responsavel, setResponsavel] = useState(pei?.responsavel || "");

  // Estratégias & Manejos
  const [manejoAtitudinal, setManejoAtitudinal] = useState(pei?.manejoAtitudinal || "");
  const [estrategiaHiperfoco, setEstrategiaHiperfoco] = useState(pei?.estrategiaHiperfoco || "");
  const [flexibilizacaoBncc, setFlexibilizacaoBncc] = useState(pei?.flexibilizacaoBncc || "");
  const [suporteSocioemocional, setSuporteSocioemocional] = useState(pei?.suporteSocioemocional || "");
  const [recursosAcessibilidade, setRecursosAcessibilidade] = useState(pei?.recursosAcessibilidade || "");
  const [adaptacoesAvaliativas, setAdaptacoesAvaliativas] = useState(pei?.adaptacoesAvaliativas || "");
  const [dicaPsicopedagoga, setDicaPsicopedagoga] = useState(pei?.dicaPsicopedagoga || "");

  // Barreiras & Metas
  const [barreiras, setBarreiras] = useState(pei?.barreiras || []);
  const [metas, setMetas] = useState(pei?.metas || []);

  // Campos para Nova Meta
  const [novaMetaDesc, setNovaMetaDesc] = useState("");
  const [novaMetaPrazo, setNovaMetaPrazo] = useState("Curto Prazo (1 a 3 meses)");
  const [novaMetaCat, setNovaMetaCat] = useState("Aprendizagem");

  // Campos para Nova Barreira
  const [novaBarreiraTipo, setNovaBarreiraTipo] = useState("Cognitiva/Atencional");
  const [novaBarreiraDesc, setNovaBarreiraDesc] = useState("");

  const handleSalvarPei = () => {
    onUpdatePei(caseId, {
      ...pei,
      escola,
      atendimentoAee,
      responsavel,
      diagnostico,
      queixaPrincipal,
      perfilAprendizagem,
      potencialidadesInteresses: potencialidades,
      status: statusPei,
      barreiras,
      metas,
      manejoAtitudinal,
      estrategiaHiperfoco,
      flexibilizacaoBncc,
      suporteSocioemocional,
      recursosAcessibilidade,
      adaptacoesAvaliativas,
      dicaPsicopedagoga,
      ultimaAtualizacao: "Hoje"
    });
    setIsEditing(false);
  };

  const addMeta = () => {
    if (!novaMetaDesc.trim()) return;
    setMetas([
      ...metas,
      { id: Date.now(), categoria: novaMetaCat, prazo: novaMetaPrazo, descricao: novaMetaDesc, status: "Em Andamento" }
    ]);
    setNovaMetaDesc("");
  };

  const removeMeta = (id) => {
    setMetas(metas.filter((m) => m.id !== id));
  };

  const toggleMetaStatus = (id) => {
    setMetas(metas.map((m) => m.id === id ? { ...m, status: m.status === "Concluída" ? "Em Andamento" : "Concluída" } : m));
  };

  const addBarreira = () => {
    if (!novaBarreiraDesc.trim()) return;
    setBarreiras([...barreiras, { tipo: novaBarreiraTipo, descricao: novaBarreiraDesc }]);
    setNovaBarreiraDesc("");
  };

  const removeBarreira = (idx) => {
    setBarreiras(barreiras.filter((_, i) => i !== idx));
  };

  if (!pei) {
    return (
      <div className="p-8 text-center rounded-lg" style={{ backgroundColor: C.paper, border: `1px dashed ${C.border}` }}>
        <FileCheck2 size={32} className="mx-auto mb-2 opacity-50" color={C.brand} />
        <p className="text-base font-semibold" style={{ color: C.textPrimary }}>PEI ainda não elaborado para este aluno.</p>
        <button
          onClick={() => setIsEditing(true)}
          className="mt-3 px-4 py-2 text-sm text-white rounded-md font-medium"
          style={{ backgroundColor: C.brand }}
        >
          Elaborar PEI do AEE Agora
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Cabeçalho do PEI */}
      <div className="flex flex-wrap items-center justify-between p-4 rounded-lg" style={{ backgroundColor: C.brandSoft, border: `1px solid ${C.border}` }}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg text-white" style={{ backgroundColor: C.brand }}>
            <FileCheck2 size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold" style={{ color: C.ink, fontFamily: "'Fraunces', serif" }}>
                Plano Educacional Individualizado (PEI - AEE)
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-white" style={{ color: C.brand }}>
                {pei.status}
              </span>
            </div>
            <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>
              Elaborado em: <span className="font-semibold">{pei.dataElaboracao}</span> • Responsável: <span className="font-semibold">{pei.responsavel}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-2 sm:mt-0 px-4 py-2 text-sm rounded-md font-medium flex items-center gap-1.5 transition-colors shadow-sm"
          style={{
            backgroundColor: isEditing ? C.ink : C.card,
            color: isEditing ? "#FFF" : C.brand,
            border: `1px solid ${C.brand}`
          }}
        >
          {isEditing ? <X size={16} /> : <Edit3 size={16} />}
          {isEditing ? "Cancelar Edição" : "Editar PEI Completo"}
        </button>
      </div>

      {/* Dica da Psicopedagoga em Destaque Visual */}
      {pei.dicaPsicopedagoga && (
        <div className="p-4 rounded-lg border flex items-start gap-3 bg-amber-50/70 border-amber-200">
          <div className="p-2 rounded-full bg-amber-500 text-white shrink-0 mt-0.5">
            <Lightbulb size={20} />
          </div>
          <div>
            <p className="text-xs uppercase font-bold font-mono text-amber-800 tracking-wide">
              💡 Dica de Aplicação da Psicopedagoga (AEE)
            </p>
            <p className="text-sm text-slate-800 mt-1 leading-relaxed italic">
              "{pei.dicaPsicopedagoga}"
            </p>
          </div>
        </div>
      )}

      {/* MODO DE EDIÇÃO DO PEI */}
      {isEditing ? (
        <div className="flex flex-col gap-5 p-5 rounded-lg bg-white shadow-sm" style={{ border: `1px solid ${C.border}` }}>
          <h4 className="font-bold text-lg border-b pb-2" style={{ color: C.brand, fontFamily: "'Fraunces', serif" }}>
            Formulário de Edição do PEI - AEE
          </h4>

          {/* I. Identificação */}
          <div className="p-4 rounded border bg-slate-50">
            <h5 className="font-bold text-xs uppercase font-mono mb-3" style={{ color: C.brand }}>I. Dados de Identificação & Atendimento AEE</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Escola</label>
                <input type="text" value={escola} onChange={(e) => setEscola(e.target.value)} className="w-full text-sm p-2 border rounded bg-white" />
              </div>
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Atendimento AEE / Frequência</label>
                <input type="text" value={atendimentoAee} onChange={(e) => setAtendimentoAee(e.target.value)} className="w-full text-sm p-2 border rounded bg-white" />
              </div>
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Profissional Responsável</label>
                <input type="text" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} className="w-full text-sm p-2 border rounded bg-white" />
              </div>
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Status do PEI</label>
                <select value={statusPei} onChange={(e) => setStatusPei(e.target.value)} className="w-full text-sm p-2 border rounded bg-white">
                  <option>Ativo</option>
                  <option>Em Revisão</option>
                  <option>Rascunho</option>
                </select>
              </div>
            </div>
          </div>

          {/* II. Anamnese */}
          <div className="p-4 rounded border bg-slate-50">
            <h5 className="font-bold text-xs uppercase font-mono mb-3" style={{ color: C.brand }}>II. Estudo de Caso e Anamnese</h5>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Diagnóstico / CID</label>
                <input type="text" value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} className="w-full text-sm p-2 border rounded bg-white" />
              </div>
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Queixa Principal / Necessidade Educacional</label>
                <textarea value={queixaPrincipal} onChange={(e) => setQueixaPrincipal(e.target.value)} rows={2} className="w-full text-sm p-2 border rounded bg-white resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Perfil de Aprendizagem (Como aprende melhor)</label>
                <textarea value={perfilAprendizagem} onChange={(e) => setPerfilAprendizagem(e.target.value)} rows={2} className="w-full text-sm p-2 border rounded bg-white resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Potencialidades & Hiperfoco</label>
                <textarea value={potencialidades} onChange={(e) => setPotencialidades(e.target.value)} rows={2} className="w-full text-sm p-2 border rounded bg-white resize-none" />
              </div>
            </div>

            {/* Gerenciar Barreiras */}
            <div className="mt-4 pt-3 border-t">
              <label className="text-xs font-bold font-mono block mb-2 text-slate-700">Barreiras Identificadas</label>
              <div className="flex flex-col gap-2 mb-3">
                {barreiras.map((b, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-white border text-sm">
                    <div>
                      <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-slate-200 mr-2">{b.tipo}</span>
                      <span>{b.descricao}</span>
                    </div>
                    <button onClick={() => removeBarreira(idx)} className="text-red-500 hover:text-red-700 text-xs">Remover</button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <select value={novaBarreiraTipo} onChange={(e) => setNovaBarreiraTipo(e.target.value)} className="text-sm p-2 border rounded bg-white">
                  <option>Cognitiva/Atencional</option>
                  <option>Pedagógica</option>
                  <option>Socioemocional</option>
                  <option>Atitudinal/Identitária</option>
                  <option>Comportamental/TOD</option>
                  <option>Comunicação/Fala</option>
                </select>
                <input type="text" value={novaBarreiraDesc} onChange={(e) => setNovaBarreiraDesc(e.target.value)} placeholder="Descrição da barreira..." className="flex-1 text-sm p-2 border rounded bg-white" />
                <button onClick={addBarreira} className="px-3 py-2 text-sm text-white rounded font-medium" style={{ backgroundColor: C.brand }}>+ Add Barreira</button>
              </div>
            </div>
          </div>

          {/* III. Metas SMART */}
          <div className="p-4 rounded border bg-slate-50">
            <h5 className="font-bold text-xs uppercase font-mono mb-3" style={{ color: C.brand }}>III. Objetivos Educacionais Individualizados (Metas SMART)</h5>
            <div className="flex flex-col gap-2 mb-3">
              {metas.map((m) => (
                <div key={m.id} className="flex items-center justify-between p-2.5 rounded bg-white border text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={m.status === "Concluída"} onChange={() => toggleMetaStatus(m.id)} className="cursor-pointer" />
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">{m.categoria || "Geral"}</span>
                    <span className={m.status === "Concluída" ? "line-through text-slate-400" : "text-slate-800"}>{m.descricao}</span>
                    <span className="text-xs px-2 py-0.5 rounded font-mono bg-slate-200">{m.prazo}</span>
                  </div>
                  <button onClick={() => removeMeta(m.id)} className="text-red-500 hover:text-red-700 text-xs">Remover</button>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <select value={novaMetaCat} onChange={(e) => setNovaMetaCat(e.target.value)} className="text-sm p-2 border rounded bg-white">
                <option>Aprendizagem</option>
                <option>Engajamento</option>
                <option>Socioemocional</option>
                <option>Comunicação</option>
                <option>Escrita</option>
                <option>Autonomia</option>
                <option>Socialização</option>
              </select>
              <select value={novaMetaPrazo} onChange={(e) => setNovaMetaPrazo(e.target.value)} className="text-sm p-2 border rounded bg-white">
                <option>Curto Prazo (1 a 3 meses)</option>
                <option>Médio Prazo (4 a 6 meses)</option>
                <option>Longo Prazo (Ano Letivo)</option>
              </select>
              <input type="text" value={novaMetaDesc} onChange={(e) => setNovaMetaDesc(e.target.value)} placeholder="Descrição da meta..." className="flex-1 text-sm p-2 border rounded bg-white min-w-[200px]" />
              <button onClick={addMeta} className="px-3 py-2 text-sm text-white rounded font-medium" style={{ backgroundColor: C.brand }}>+ Add Meta</button>
            </div>
          </div>

          {/* IV. Adequações & Estratégias */}
          <div className="p-4 rounded border bg-slate-50">
            <h5 className="font-bold text-xs uppercase font-mono mb-3" style={{ color: C.brand }}>IV. Adequações & Estratégias Metodológicas</h5>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Manejo Atitudinal Obrigatório</label>
                <textarea value={manejoAtitudinal} onChange={(e) => setManejoAtitudinal(e.target.value)} rows={2} className="w-full text-sm p-2 border rounded bg-white resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Estratégia do Hiperfoco</label>
                <textarea value={estrategiaHiperfoco} onChange={(e) => setEstrategiaHiperfoco(e.target.value)} rows={2} className="w-full text-sm p-2 border rounded bg-white resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Flexibilização Curricular (BNCC)</label>
                <textarea value={flexibilizacaoBncc} onChange={(e) => setFlexibilizacaoBncc(e.target.value)} rows={2} className="w-full text-sm p-2 border rounded bg-white resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Suporte Socioemocional & Sistema "Primeiro / Depois"</label>
                <textarea value={suporteSocioemocional} onChange={(e) => setSuporteSocioemocional(e.target.value)} rows={2} className="w-full text-sm p-2 border rounded bg-white resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">Adaptações Avaliativas</label>
                <textarea value={adaptacoesAvaliativas} onChange={(e) => setAdaptacoesAvaliativas(e.target.value)} rows={2} className="w-full text-sm p-2 border rounded bg-white resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold block text-slate-600 mb-1">💡 Dica de Aplicação da Psicopedagoga</label>
                <textarea value={dicaPsicopedagoga} onChange={(e) => setDicaPsicopedagoga(e.target.value)} rows={2} className="w-full text-sm p-2 border rounded bg-white resize-none font-italic" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t pt-3">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm text-slate-600">Cancelar</button>
            <button onClick={handleSalvarPei} className="px-5 py-2 text-sm text-white rounded font-medium flex items-center gap-1.5" style={{ backgroundColor: C.brand }}>
              <CheckCircle2 size={16} /> Salvar Todas as Alterações no PEI
            </button>
          </div>
        </div>
      ) : (
        /* MODO DE VISUALIZAÇÃO DO PEI COM SUB-ABAS ORGANIZADAS */
        <div>
          {/* Navegação entre as 5 Seções Oficiais do PEI */}
          <div className="flex flex-wrap gap-1.5 mb-5 border-b pb-2" style={{ borderColor: C.border }}>
            <button
              onClick={() => setSubTab("identificacao")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono transition-colors ${subTab === "identificacao" ? "text-white" : "text-slate-600 bg-slate-100 hover:bg-slate-200"}`}
              style={{ backgroundColor: subTab === "identificacao" ? C.brand : undefined }}
            >
              I. Identificação AEE
            </button>
            <button
              onClick={() => setSubTab("anamnese")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono transition-colors ${subTab === "anamnese" ? "text-white" : "text-slate-600 bg-slate-100 hover:bg-slate-200"}`}
              style={{ backgroundColor: subTab === "anamnese" ? C.brand : undefined }}
            >
              II. Estudo de Caso & Barreiras
            </button>
            <button
              onClick={() => setSubTab("metas")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono transition-colors ${subTab === "metas" ? "text-white" : "text-slate-600 bg-slate-100 hover:bg-slate-200"}`}
              style={{ backgroundColor: subTab === "metas" ? C.brand : undefined }}
            >
              III. Metas SMART ({pei.metas?.length || 0})
            </button>
            <button
              onClick={() => setSubTab("estrategias")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono transition-colors ${subTab === "estrategias" ? "text-white" : "text-slate-600 bg-slate-100 hover:bg-slate-200"}`}
              style={{ backgroundColor: subTab === "estrategias" ? C.brand : undefined }}
            >
              IV. Estratégias & Adaptações
            </button>
            <button
              onClick={() => setSubTab("acompanhamento")}
              className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono transition-colors ${subTab === "acompanhamento" ? "text-white" : "text-slate-600 bg-slate-100 hover:bg-slate-200"}`}
              style={{ backgroundColor: subTab === "acompanhamento" ? C.brand : undefined }}
            >
              V. Acompanhamento & Ética
            </button>
          </div>

          {/* CONTEÚDO DAS SUB-ABAS */}

          {/* I. Identificação */}
          {subTab === "identificacao" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white border flex flex-col gap-2">
                <p className="text-xs font-bold font-mono uppercase text-slate-400">Escola & Turma</p>
                <p className="text-sm font-semibold text-slate-800">{pei.escola || "Grupo Escolar Edjackson Leocádio"}</p>
                <p className="text-xs text-slate-500">Série/Turno: <span className="font-semibold text-slate-700">6º/7º Ano - Ensino Fundamental II (Manhã)</span></p>
              </div>

              <div className="p-4 rounded-lg bg-white border flex flex-col gap-2">
                <p className="text-xs font-bold font-mono uppercase text-slate-400">Atendimento AEE</p>
                <p className="text-sm font-semibold text-teal-800">{pei.atendimentoAee || "Sala de Recursos Multifuncionais - Tarde (2x por semana)"}</p>
                <p className="text-xs text-slate-500">Profissional AEE: <span className="font-semibold text-slate-700">{pei.responsavel}</span></p>
              </div>
            </div>
          )}

          {/* II. Estudo de Caso & Barreiras */}
          {subTab === "anamnese" && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white border flex flex-col gap-2" style={{ borderColor: C.border }}>
                  <div className="flex items-center gap-2" style={{ color: C.brand }}>
                    <ShieldAlert size={18} />
                    <h4 className="font-bold text-xs uppercase tracking-wide font-mono">Diagnóstico / CID</h4>
                  </div>
                  <p className="text-sm font-bold text-slate-800">{pei.diagnostico}</p>
                </div>

                <div className="p-4 rounded-lg bg-white border flex flex-col gap-2" style={{ borderColor: C.border }}>
                  <div className="flex items-center gap-2" style={{ color: C.brand }}>
                    <Sparkles size={18} />
                    <h4 className="font-bold text-xs uppercase tracking-wide font-mono">Potencialidades & Hiperfoco</h4>
                  </div>
                  <p className="text-sm text-slate-800">{pei.potencialidadesInteresses}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white border flex flex-col gap-2" style={{ borderColor: C.border }}>
                <h4 className="font-bold text-xs uppercase tracking-wide font-mono text-slate-500 mb-1">Queixa Principal / Necessidade Educacional</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{pei.queixaPrincipal}</p>
              </div>

              <div className="p-4 rounded-lg bg-white border flex flex-col gap-2" style={{ borderColor: C.border }}>
                <h4 className="font-bold text-xs uppercase tracking-wide font-mono text-slate-500 mb-1">Perfil de Aprendizagem</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{pei.perfilAprendizagem}</p>
              </div>

              {/* Barreiras Categorizadas */}
              <div className="p-4 rounded-lg bg-white border" style={{ borderColor: C.border }}>
                <h4 className="font-bold text-xs uppercase tracking-wide font-mono mb-3" style={{ color: C.brand }}>
                  Barreiras Identificadas (Acesso ao Currículo)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(pei.barreiras || []).map((b, idx) => (
                    <div key={idx} className="p-3 rounded bg-slate-50 border flex flex-col gap-1">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded w-fit bg-red-100 text-red-800">
                        {b.tipo}
                      </span>
                      <p className="text-xs text-slate-700 mt-1">{b.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* III. Metas SMART */}
          {subTab === "metas" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-3 rounded bg-teal-50 border border-teal-200">
                <span className="text-xs font-mono font-bold text-teal-900">Progresso do PEI</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white text-teal-800">
                  {pei.metas.filter(m => m.status === "Concluída").length} de {pei.metas.length} Metas Concluídas
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {(pei.metas || []).map((m) => (
                  <div key={m.id} className="p-4 rounded-lg bg-white border flex flex-col gap-2 shadow-sm" style={{ borderColor: C.border }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded font-bold bg-teal-100 text-teal-800">
                          {m.categoria || "Geral"}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{m.prazo}</span>
                      </div>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${m.status === "Concluída" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                        {m.status}
                      </span>
                    </div>
                    <p className={`text-sm font-medium mt-1 ${m.status === "Concluída" ? "line-through text-slate-400" : "text-slate-800"}`}>
                      {m.descricao}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IV. Estratégias & Adaptações */}
          {subTab === "estrategias" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pei.manejoAtitudinal && (
                <div className="p-4 rounded-lg bg-white border flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-rose-700">
                    <AlertTriangle size={18} />
                    <h4 className="font-bold text-xs uppercase tracking-wide font-mono">Manejo Atitudinal Obrigatório</h4>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium bg-rose-50/50 p-3 rounded border border-rose-100">
                    {pei.manejoAtitudinal}
                  </p>
                </div>
              )}

              {pei.estrategiaHiperfoco && (
                <div className="p-4 rounded-lg bg-white border flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-teal-700">
                    <Sparkles size={18} />
                    <h4 className="font-bold text-xs uppercase tracking-wide font-mono">Estratégia do Hiperfoco</h4>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed bg-teal-50/50 p-3 rounded border border-teal-100">
                    {pei.estrategiaHiperfoco}
                  </p>
                </div>
              )}

              {pei.flexibilizacaoBncc && (
                <div className="p-4 rounded-lg bg-white border flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-slate-700">
                    <BookOpen size={18} />
                    <h4 className="font-bold text-xs uppercase tracking-wide font-mono">Flexibilização Curricular (BNCC)</h4>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed">{pei.flexibilizacaoBncc}</p>
                </div>
              )}

              {pei.suporteSocioemocional && (
                <div className="p-4 rounded-lg bg-white border flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-purple-700">
                    <HeartHandshake size={18} />
                    <h4 className="font-bold text-xs uppercase tracking-wide font-mono">Suporte Socioemocional & Antecipação</h4>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed">{pei.suporteSocioemocional}</p>
                </div>
              )}

              {pei.adaptacoesAvaliativas && (
                <div className="p-4 rounded-lg bg-white border flex flex-col gap-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Sliders size={18} />
                    <h4 className="font-bold text-xs uppercase tracking-wide font-mono">Adaptações Avaliativas</h4>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed">{pei.adaptacoesAvaliativas}</p>
                </div>
              )}
            </div>
          )}

          {/* V. Acompanhamento & Ética */}
          {subTab === "acompanhamento" && (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-lg bg-white border flex flex-col gap-2">
                <h4 className="font-bold text-xs uppercase tracking-wide font-mono text-slate-500">Instrumentos de Registro</h4>
                <p className="text-sm text-slate-800">{pei.instrumentosRegistro || "Relatório diário de atendimento no AEE e portfólio de atividades físicas."}</p>
              </div>

              <div className="p-4 rounded-lg bg-white border flex flex-col gap-2">
                <h4 className="font-bold text-xs uppercase tracking-wide font-mono text-slate-500">Articulação & Alinhamento Multidisciplinar</h4>
                <p className="text-sm text-slate-800">{pei.articulacaoMultidisciplinar || "Reuniões periódicas entre o AEE e os professores regentes do Ensino Fundamental II."}</p>
              </div>

              <div className="p-4 rounded-lg bg-slate-100 border text-xs text-slate-600 italic">
                🔒 **Sigilo Profissional**: As informações coletadas neste PEI possuem caráter estritamente profissional e confidencial, protegidas pelo Código de Ética e diretrizes da psicopedagoga/AEE.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   FICHA COMPLETA DO ALUNO / CASO
--------------------------------------------------------- */
const TABS = ["Perfil", "PEI", "Sessões", "Evolução", "Atividades", "Relatórios", "Anexos"];

function Ficha({ c, onBack, onAddSessao, onAddAtividade, onUpdateAtividade, onUpdatePei }) {
  const [tab, setTab] = useState("Perfil");
  const [showFormSessao, setShowFormSessao] = useState(false);
  const [showFormAtividade, setShowFormAtividade] = useState(false);

  // Form Sessão
  const [novoResumo, setNovoResumo] = useState("");
  const [novoTipo, setNovoTipo] = useState("Individual");

  // Form Nova Atividade
  const [tituloAtiv, setTituloAtiv] = useState("");
  const [categoriaAtiv, setCategoriaAtiv] = useState("Alfabetização & Leitura");
  const [notaAtiv, setNotaAtiv] = useState(8.0);
  const [statusAtiv, setStatusAtiv] = useState("Concluída");
  const [obsAtiv, setObsAtiv] = useState("");

  // Estado para Edição Inline de Atividade
  const [editingId, setEditingId] = useState(null);
  const [editNota, setEditNota] = useState(0);
  const [editObs, setEditObs] = useState("");
  const [editStatus, setEditStatus] = useState("Concluída");

  const s = STATUS[c.status];

  const salvarSessao = () => {
    if (!novoResumo.trim()) return;
    onAddSessao(c.id, { tipo: novoTipo, resumo: novoResumo });
    setNovoResumo("");
    setShowFormSessao(false);
  };

  const salvarNovaAtividade = () => {
    if (!tituloAtiv.trim()) return;
    onAddAtividade(c.id, {
      titulo: tituloAtiv,
      categoria: categoriaAtiv,
      nota: parseFloat(notaAtiv),
      status: statusAtiv,
      observacao: obsAtiv || "Sem observação informada.",
      data: "Hoje"
    });
    setTituloAtiv("");
    setObsAtiv("");
    setShowFormAtividade(false);
  };

  const iniciarEdicao = (ativ) => {
    setEditingId(ativ.id);
    setEditNota(ativ.nota);
    setEditObs(ativ.observacao);
    setEditStatus(ativ.status);
  };

  const salvarEdicao = (ativId) => {
    onUpdateAtividade(c.id, ativId, {
      nota: parseFloat(editNota),
      observacao: editObs,
      status: editStatus
    });
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm mb-4 font-medium" style={{ color: C.textSecondary }}>
        <ArrowLeft size={15} /> Voltar para a lista de casos
      </button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: C.ink }}>{c.nome}</h1>
          <p className="mt-1" style={{ color: C.textSecondary }}>{c.turma} • {c.idade} anos • {c.profissional}</p>
        </div>
        <Badge status={c.status} />
      </div>

      {/* Folder Tabs */}
      <div className="flex gap-1 mt-6" style={{ borderBottom: `2px solid ${s.color}` }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="text-sm px-4 py-2 rounded-t-md relative -mb-0.5 flex items-center gap-1.5 transition-colors"
            style={{
              backgroundColor: tab === t ? C.card : "transparent",
              color: tab === t ? C.ink : C.textSecondary,
              border: tab === t ? `2px solid ${s.color}` : "2px solid transparent",
              borderBottom: tab === t ? `2px solid ${C.card}` : "2px solid transparent",
              fontWeight: tab === t ? 600 : 400,
            }}
          >
            {t === "PEI" && <FileCheck2 size={14} color={tab === t ? C.brand : C.textSecondary} />}
            {t === "Atividades" && <Activity size={14} color={tab === t ? C.brand : C.textSecondary} />}
            {t}
            {t === "PEI" && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase" style={{ backgroundColor: C.brandSoft, color: C.brand }}>
                AEE
              </span>
            )}
            {t === "Atividades" && (c.atividades ? c.atividades.length : 0) > 0 && (
              <span className="text-xs px-1.5 py-0.2 rounded-full font-bold" style={{ backgroundColor: C.brandSoft, color: C.brand }}>
                {c.atividades.length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-b-lg rounded-tr-lg p-5" style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, borderTop: "none" }}>
        {/* PERFIL */}
        {tab === "Perfil" && (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide mb-1 font-mono" style={{ color: C.textSecondary }}>Motivo do encaminhamento</p>
              <p className="text-sm" style={{ color: C.textPrimary }}>{c.motivo}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide mb-1 font-mono" style={{ color: C.textSecondary }}>Contexto escolar & AEE</p>
              <p className="text-sm" style={{ color: C.textPrimary }}>{c.contexto}</p>
            </div>
          </div>
        )}

        {/* PEI */}
        {tab === "PEI" && (
          <PeiSection caseId={c.id} pei={c.pei} onUpdatePei={onUpdatePei} />
        )}

        {/* SESSÕES */}
        {tab === "Sessões" && (
          <div>
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setShowFormSessao(!showFormSessao)}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md text-white font-medium"
                style={{ backgroundColor: C.brand }}
              >
                {showFormSessao ? <X size={15} /> : <Plus size={15} />}
                {showFormSessao ? "Cancelar" : "Registrar sessão"}
              </button>
            </div>

            {showFormSessao && (
              <div className="rounded-md p-4 mb-4 flex flex-col gap-3" style={{ backgroundColor: C.paper, border: `1px solid ${C.border}` }}>
                <select
                  value={novoTipo}
                  onChange={(e) => setNovoTipo(e.target.value)}
                  className="text-sm px-3 py-2 rounded-md outline-none w-fit"
                  style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, color: C.textPrimary }}
                >
                  <option>Individual / AEE</option>
                  <option>Avaliação Psicopedagógica</option>
                  <option>Reunião com família</option>
                  <option>Alinhamento com escola</option>
                </select>
                <textarea
                  value={novoResumo}
                  onChange={(e) => setNovoResumo(e.target.value)}
                  placeholder="Resumo da sessão psicopedagógica / AEE..."
                  rows={3}
                  className="text-sm px-3 py-2 rounded-md outline-none resize-none"
                  style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, color: C.textPrimary }}
                />
                <button
                  onClick={salvarSessao}
                  className="text-sm px-3 py-1.5 rounded-md text-white w-fit flex items-center gap-1.5 font-medium"
                  style={{ backgroundColor: C.brand }}
                >
                  <CheckCircle2 size={15} /> Salvar registro
                </button>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {c.sessoes.map((s2) => (
                <div key={s2.id} className="pl-4" style={{ borderLeft: `2px solid ${C.border}` }}>
                  <p className="text-xs font-mono" style={{ color: C.textSecondary }}>{s2.data} • {s2.tipo}</p>
                  <p className="text-sm mt-1" style={{ color: C.textPrimary }}>{s2.resumo}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVOLUÇÃO */}
        {tab === "Evolução" && (
          <div className="flex flex-col gap-4">
            {c.evolucao.map((e, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center pt-1">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: C.brand }} />
                  {i < c.evolucao.length - 1 && <div className="w-px flex-1 mt-1" style={{ backgroundColor: C.border }} />}
                </div>
                <div className="pb-2">
                  <p className="text-xs font-mono" style={{ color: C.textSecondary }}>{e.data}</p>
                  <p className="text-sm font-medium mt-0.5" style={{ color: C.textPrimary }}>{e.titulo}</p>
                  <p className="text-sm mt-0.5" style={{ color: C.textSecondary }}>{e.texto}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ATIVIDADES */}
        {tab === "Atividades" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold" style={{ fontFamily: "'Fraunces', serif", color: C.ink }}>
                  Atividades & Intervenções Psicopedagógicas
                </h3>
                <p className="text-xs text-slate-500">
                  Registre tarefas, jogos diagnósticos e notas de desempenho do aluno.
                </p>
              </div>
              <button
                onClick={() => setShowFormAtividade(!showFormAtividade)}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md text-white font-medium"
                style={{ backgroundColor: C.brand }}
              >
                {showFormAtividade ? <X size={15} /> : <Plus size={15} />}
                {showFormAtividade ? "Cancelar" : "Incluir atividade"}
              </button>
            </div>

            {showFormAtividade && (
              <div className="rounded-md p-4 mb-5 flex flex-col gap-3" style={{ backgroundColor: C.paper, border: `1px solid ${C.border}` }}>
                <p className="text-xs uppercase font-bold font-mono" style={{ color: C.brand }}>Nova Atividade para {c.nome}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs block mb-1 font-medium" style={{ color: C.textSecondary }}>Título da Atividade</label>
                    <input
                      type="text"
                      value={tituloAtiv}
                      onChange={(e) => setTituloAtiv(e.target.value)}
                      placeholder="Ex: Treino de Consciência Fonológica"
                      className="w-full text-sm px-3 py-2 rounded-md outline-none bg-white"
                      style={{ border: `1px solid ${C.border}`, color: C.textPrimary }}
                    />
                  </div>
                  <div>
                    <label className="text-xs block mb-1 font-medium" style={{ color: C.textSecondary }}>Categoria</label>
                    <select
                      value={categoriaAtiv}
                      onChange={(e) => setCategoriaAtiv(e.target.value)}
                      className="w-full text-sm px-3 py-2 rounded-md outline-none bg-white"
                      style={{ border: `1px solid ${C.border}`, color: C.textPrimary }}
                    >
                      <option>Alfabetização & Leitura</option>
                      <option>Raciocínio Lógico</option>
                      <option>Atenção & Memória</option>
                      <option>Coordenação Motora</option>
                      <option>Leitura & Escrita</option>
                      <option>Funções Executivas</option>
                      <option>Socioemocional & Linguagem</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs block mb-1 font-medium" style={{ color: C.textSecondary }}>Nota / Desempenho (0 a 10)</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value={notaAtiv}
                      onChange={(e) => setNotaAtiv(e.target.value)}
                      className="w-full text-sm px-3 py-2 rounded-md outline-none bg-white font-mono font-bold"
                      style={{ border: `1px solid ${C.border}`, color: C.brand }}
                    />
                  </div>
                  <div>
                    <label className="text-xs block mb-1 font-medium" style={{ color: C.textSecondary }}>Status</label>
                    <select
                      value={statusAtiv}
                      onChange={(e) => setStatusAtiv(e.target.value)}
                      className="w-full text-sm px-3 py-2 rounded-md outline-none bg-white"
                      style={{ border: `1px solid ${C.border}`, color: C.textPrimary }}
                    >
                      <option>Concluída</option>
                      <option>Em Andamento</option>
                      <option>Planejada</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs block mb-1 font-medium" style={{ color: C.textSecondary }}>Observação Psicopedagógica</label>
                  <textarea
                    value={obsAtiv}
                    onChange={(e) => setObsAtiv(e.target.value)}
                    placeholder="Descreva o comportamento do aluno, facilidades, dificuldades ou estratégias utilizadas..."
                    rows={3}
                    className="w-full text-sm px-3 py-2 rounded-md outline-none resize-none bg-white"
                    style={{ border: `1px solid ${C.border}`, color: C.textPrimary }}
                  />
                </div>

                <button
                  onClick={salvarNovaAtividade}
                  className="text-sm px-4 py-2 rounded-md text-white font-medium w-fit flex items-center gap-1.5 mt-1"
                  style={{ backgroundColor: C.brand }}
                >
                  <CheckCircle2 size={16} /> Registrar Atividade
                </button>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {(c.atividades || []).map((ativ) => (
                <div
                  key={ativ.id}
                  className="rounded-lg p-4 transition-all"
                  style={{ backgroundColor: C.paper, border: `1px solid ${C.border}` }}
                >
                  {editingId === ativ.id ? (
                    <div className="flex flex-col gap-3 p-3 bg-white rounded border border-teal-200">
                      <p className="text-xs font-bold font-mono" style={{ color: C.brand }}>Editar Nota & Observação: {ativ.titulo}</p>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs block text-slate-500 font-medium">Nota (0 a 10)</label>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.5"
                            value={editNota}
                            onChange={(e) => setEditNota(e.target.value)}
                            className="w-full text-sm p-1.5 border rounded font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-xs block text-slate-500 font-medium">Status</label>
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="w-full text-sm p-1.5 border rounded"
                          >
                            <option>Concluída</option>
                            <option>Em Andamento</option>
                            <option>Planejada</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs block text-slate-500 font-medium">Observação Psicopedagógica</label>
                        <textarea
                          value={editObs}
                          onChange={(e) => setEditObs(e.target.value)}
                          rows={3}
                          className="w-full text-sm p-2 border rounded resize-none"
                        />
                      </div>

                      <div className="flex justify-end gap-2 mt-1">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => salvarEdicao(ativ.id)}
                          className="px-3 py-1 text-xs text-white rounded font-medium flex items-center gap-1 hover:opacity-90"
                          style={{ backgroundColor: C.brand }}
                        >
                          <Check size={14} /> Salvar Alterações
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ backgroundColor: C.brandSoft, color: C.brand }}>
                              {ativ.categoria}
                            </span>
                            <span className="text-xs font-mono" style={{ color: C.textSecondary }}>{ativ.data}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-200 text-slate-700">
                              {ativ.status}
                            </span>
                          </div>
                          <h4 className="text-base font-semibold" style={{ color: C.textPrimary, fontFamily: "'Fraunces', serif" }}>
                            {ativ.titulo}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <NotaBadge nota={ativ.nota} />
                          <button
                            onClick={() => iniciarEdicao(ativ)}
                            title="Editar nota e observação"
                            className="p-1.5 rounded hover:bg-slate-200 transition-colors"
                            style={{ color: C.textSecondary }}
                          >
                            <Edit3 size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 p-3 rounded bg-white" style={{ borderLeft: `3px solid ${C.brand}`, border: `1px solid ${C.border}`, borderLeftWidth: "3px" }}>
                        <p className="text-xs font-bold uppercase font-mono mb-0.5" style={{ color: C.textSecondary }}>Observação Psicopedagógica:</p>
                        <p className="text-sm text-slate-700 italic">{ativ.observacao}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {(!c.atividades || c.atividades.length === 0) && (
                <div className="p-6 text-center rounded-md" style={{ backgroundColor: C.paper, border: `1px dashed ${C.border}` }}>
                  <Activity size={24} className="mx-auto mb-2 opacity-40" color={C.brand} />
                  <p className="text-sm font-medium" style={{ color: C.textPrimary }}>Nenhuma atividade registrada para este aluno.</p>
                  <p className="text-xs mt-1" style={{ color: C.textSecondary }}>Clique no botão "Incluir atividade" acima para adicionar a primeira intervenção.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RELATÓRIOS */}
        {tab === "Relatórios" && (
          <div className="flex flex-col gap-2">
            {c.relatorios.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-3 py-2.5 rounded-md" style={{ backgroundColor: C.paper }}>
                <div className="flex items-center gap-2">
                  <FileText size={16} color={C.brand} />
                  <p className="text-sm" style={{ color: C.textPrimary }}>{r.titulo}</p>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: r.status === "finalizado" ? "#EDF4EE" : "#FBF3DE",
                    color: r.status === "finalizado" ? "#6FA287" : "#C98A08",
                  }}
                >
                  {r.status === "finalizado" ? "Finalizado" : "Rascunho"}
                </span>
              </div>
            ))}
            {c.relatorios.length === 0 && <p className="text-sm" style={{ color: C.textSecondary }}>Nenhum relatório para este caso ainda.</p>}
            <button
              className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-md w-fit mt-2 font-medium"
              style={{ border: `1px solid ${C.brand}`, color: C.brand }}
            >
              <Plus size={15} /> Gerar novo relatório
            </button>
          </div>
        )}

        {/* ANEXOS */}
        {tab === "Anexos" && (
          <div className="flex flex-col gap-2">
            {c.anexos.map((a, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-md" style={{ backgroundColor: C.paper }}>
                <Paperclip size={16} color={C.textSecondary} />
                <p className="text-sm flex-1" style={{ color: C.textPrimary }}>{a.nome}</p>
                <p className="text-xs" style={{ color: C.textSecondary }}>{a.data}</p>
              </div>
            ))}
            {c.anexos.length === 0 && <p className="text-sm" style={{ color: C.textSecondary }}>Nenhum anexo ainda.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   ROOT APP
--------------------------------------------------------- */
export default function VinculoApp() {
  const [cases, setCases] = useState(CASES_INIT);
  const [view, setView] = useState("dashboard");
  const [selectedId, setSelectedId] = useState(null);

  const openCase = (id) => {
    setSelectedId(id);
    setView("ficha");
  };

  const addSessao = (caseId, { tipo, resumo }) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? {
              ...c,
              sessoes: [{ id: c.sessoes.length + 1, data: "Hoje", tipo, resumo }, ...c.sessoes],
              evolucao: [{ data: "Hoje", titulo: `Sessão registrada (${tipo})`, texto: resumo }, ...c.evolucao],
            }
          : c
      )
    );
  };

  const addAtividade = (caseId, novaAtiv) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          const ativs = c.atividades || [];
          const novaid = ativs.length + 1000;
          return {
            ...c,
            atividades: [{ id: novaid, ...novaAtiv }, ...ativs],
            evolucao: [
              {
                data: "Hoje",
                titulo: `Atividade incluída: ${novaAtiv.titulo}`,
                texto: `Nota: ${novaAtiv.nota} • ${novaAtiv.observacao}`
              },
              ...c.evolucao
            ]
          };
        }
        return c;
      })
    );
  };

  const updateAtividade = (caseId, atividadeId, novosDados) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            atividades: (c.atividades || []).map((a) =>
              a.id === atividadeId ? { ...a, ...novosDados } : a
            )
          };
        }
        return c;
      })
    );
  };

  const updatePei = (caseId, novosDadosPei) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            pei: { ...c.pei, ...novosDadosPei },
            evolucao: [
              {
                data: "Hoje",
                titulo: `PEI Atualizado`,
                texto: `Status: ${novosDadosPei.status} • Responsável: ${novosDadosPei.responsavel || c.profissional}`
              },
              ...c.evolucao
            ]
          };
        }
        return c;
      })
    );
  };

  const selected = cases.find((c) => c.id === selectedId);

  return (
    <div className="flex min-h-[700px] w-full" style={{ backgroundColor: C.paper, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      {/* SIDEBAR */}
      <div className="w-60 shrink-0 p-4 flex flex-col justify-between" style={{ backgroundColor: C.ink }}>
        <div>
          <div className="flex items-center gap-2 px-2 mb-6">
            <div className="h-7 w-7 rounded flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: C.brand }}>V</div>
            <p className="text-xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#FFFFFF" }}>
              Vínculo
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <NavItem icon={Home} label="Painel" active={view === "dashboard"} onClick={() => setView("dashboard")} />
            <NavItem icon={Users} label="Casos" active={view === "casos" || view === "ficha"} onClick={() => setView("casos")} />
            <NavItem icon={Activity} label="Atividades" active={view === "atividades"} onClick={() => setView("atividades")} badge="Novo" />
            <NavItem icon={CalendarDays} label="Agenda" active={view === "agenda"} onClick={() => setView("agenda")} />
            <NavItem icon={FileText} label="Relatórios" active={view === "relatorios"} onClick={() => setView("relatorios")} />
          </div>
        </div>

        <div className="flex items-center gap-2 px-2 pt-4" style={{ borderTop: `1px solid ${C.inkLight}` }}>
          <div className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold text-white" style={{ backgroundColor: C.brand }}>
            GL
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>Gilcilena Leal</p>
            <p className="text-xs" style={{ color: "#8A97A3" }}>Psicopedagoga / AEE</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-8 overflow-auto">
        {view === "dashboard" && <Dashboard cases={cases} onOpenCase={openCase} onGoTo={setView} />}
        {view === "casos" && <Casos cases={cases} onOpenCase={openCase} />}
        {view === "atividades" && <AtividadesView cases={cases} onOpenCase={openCase} onAddAtividade={addAtividade} />}
        {view === "agenda" && <Agenda cases={cases} onOpenCase={openCase} />}
        {view === "relatorios" && <Relatorios cases={cases} onOpenCase={openCase} />}
        {view === "ficha" && selected && (
          <Ficha
            c={selected}
            onBack={() => setView("casos")}
            onAddSessao={addSessao}
            onAddAtividade={addAtividade}
            onUpdateAtividade={updateAtividade}
            onUpdatePei={updatePei}
          />
        )}
      </div>
    </div>
  );
}
