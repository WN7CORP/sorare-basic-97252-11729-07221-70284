import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { artigo, tipo, nivel, faixaEtaria, codigo, numeroArtigo } = await req.json();
    const DIREITO_PREMIUM_API_KEY = Deno.env.get('DIREITO_PREMIUM_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!DIREITO_PREMIUM_API_KEY) {
      throw new Error('DIREITO_PREMIUM_API_KEY não configurada');
    }
    
    console.log('🚀 Iniciando geração - Tipo:', tipo, '- Nível:', nivel, '- Faixa Etária:', faixaEtaria || 'N/A');
    console.log('✅ API Key configurada:', DIREITO_PREMIUM_API_KEY.substring(0, 8) + '...');

    // Importar createClient do Supabase
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.75.1');
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Mapeamento COMPLETO universal de códigos para tabelas - Cache Universal Sprint 3
    const tableMap: { [key: string]: string } = {
      'cpp': 'CP - Código Penal',
      'cc': 'CC - Código Civil',
      'cf': 'CF - Constituição Federal',
      'cpc': 'CPC – Código de Processo Civil',
      'cpp-processo': 'CPP – Código de Processo Penal',
      'cppenal': 'CPP – Código de Processo Penal',
      'cdc': 'CDC – Código de Defesa do Consumidor',
      'clt': 'CLT – Consolidação das Leis do Trabalho',
      'ctn': 'CTN – Código Tributário Nacional',
      'ctb': 'CTB Código de Trânsito Brasileiro',
      'ce': 'CE – Código Eleitoral',
      'ca': 'CA - Código de Águas',
      'cba': 'CBA Código Brasileiro de Aeronáutica',
      'ccom': 'CCOM – Código Comercial',
      'cdm': 'CDM – Código de Minas',
      'eca': 'ESTATUTO - ECA',
      'idoso': 'ESTATUTO - IDOSO',
      'oab': 'ESTATUTO - OAB',
      'pcd': 'ESTATUTO - PESSOA COM DEFICIÊNCIA',
      'igualdade-racial': 'ESTATUTO - IGUALDADE RACIAL',
      'racial': 'ESTATUTO - IGUALDADE RACIAL',
      'cidade': 'ESTATUTO - CIDADE',
      'torcedor': 'ESTATUTO - TORCEDOR'
    };

    // Determinar o nome da coluna baseado no tipo e faixa etária
    let coluna = '';
    if (tipo === "explicacao") {
      if (nivel === "resumido") {
        coluna = "explicacao_resumido";
      } else if (nivel === "simples") {
        coluna = faixaEtaria === "menor16" ? "explicacao_simples_menor16" : "explicacao_simples_maior16";
      } else {
        coluna = "explicacao_tecnico";
      }
    } else {
      coluna = "exemplo";
    }

    // Verificar se já existe conteúdo em cache (funciona para TODOS os códigos)
    const tableName = tableMap[codigo || ''];
    console.log(`🔍 Verificando cache para: codigo="${codigo}", tabela="${tableName}", numeroArtigo="${numeroArtigo}", coluna="${coluna}"`);
    
    if (tableName && numeroArtigo) {
      try {
        const { data: cached, error: cacheError } = await supabase
          .from(tableName)
          .select(coluna)
          .eq('Número do Artigo', numeroArtigo)
          .maybeSingle();

        if (cacheError) {
          console.error('❌ Erro ao buscar cache:', cacheError);
        } else {
          console.log(`📦 Resultado da busca no cache:`, cached ? 'Registro encontrado' : 'Registro não encontrado');
        }

        const colunaValue = cached ? cached[coluna as keyof typeof cached] : null;
        console.log(`📊 Valor da coluna "${coluna}":`, colunaValue ? `Encontrado (${typeof colunaValue === 'string' ? colunaValue.length + ' caracteres' : typeof colunaValue})` : 'NULL ou vazio');
        
        if (cached && colunaValue && typeof colunaValue === 'string' && colunaValue.trim().length > 100) {
          console.log(`✅ CACHE HIT - Retornando do cache [${tableName}] - 0 tokens gastos`);
          
          // Simular streaming do conteúdo cacheado
          const cachedContent = colunaValue;
          return new Response(
            new ReadableStream({
              start(controller) {
                controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({choices: [{delta: {content: cachedContent}}]})}\n\n`));
                controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
                controller.close();
              }
            }),
            {
              headers: { 
                ...corsHeaders, 
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
              },
            }
          );
        } else {
          console.log(`❌ CACHE MISS - Gerando novo conteúdo. Razões:`, {
            registroExiste: !!cached,
            colunaTemValor: !!colunaValue,
            tipoCorreto: typeof colunaValue === 'string',
            tamanhoSuficiente: typeof colunaValue === 'string' ? colunaValue.trim().length > 100 : false
          });
        }
      } catch (e) {
        console.error('❌ Erro ao buscar cache:', e);
        // Continuar com geração se falhar a busca no cache
      }
    } else {
      console.log(`⚠️ Não é possível usar cache - tableName="${tableName}", numeroArtigo="${numeroArtigo}"`);
    }

    const artigoTitulo = artigo.split('\n')[0];

    const prompts: Record<string, string> = {
      explicacao_tecnico: `Você é um professor de Direito especializado em análise técnica minuciosa e desmembrada.

ARTIGO A SER EXPLICADO:
${artigo}

INSTRUÇÕES CRÍTICAS - SIGA RIGOROSAMENTE:
1. Explique DESMEMBRANDO cada inciso, parágrafo e alínea SEPARADAMENTE
2. Use markdown estruturado CORRETAMENTE: # para título único, ## para seções, ### para subseções, #### para itens
3. Seja EXTREMAMENTE DETALHADO - MÍNIMO 5-7 linhas por parágrafo explicativo
4. Inclua exemplos práticos CONCRETOS e aplicáveis
5. Cite jurisprudência relevante quando aplicável (STF, STJ)
6. SEMPRE use > para citações diretas da lei ou ementas
7. Use **negrito** APENAS em termos jurídicos essenciais (máximo 3-4 por parágrafo)
8. Linha vazia SEMPRE entre seções e parágrafos
9. Use --- para separar seções elegantemente
10. NUNCA escreva parágrafos com menos de 4 linhas

ESTRUTURA OBRIGATÓRIA - NÃO DESVIE:

# 📖 ${artigoTitulo}

---

## 🔍 Visão Geral do Artigo

[Parágrafo 1: 5-7 linhas sobre o contexto histórico e importância deste artigo no ordenamento jurídico brasileiro]

[Parágrafo 2: 5-7 linhas sobre o bem jurídico protegido e os objetivos da norma]

[Parágrafo 3: 5-7 linhas sobre aplicabilidade prática e relevância atual]

---

## 📋 Texto Integral da Lei

> ${artigo}

---

## ⚖️ Análise Técnica Desmembrada

### **Caput (Texto Principal)**

> "[Citar EXATAMENTE o caput do artigo]"

**Elementos Constituintes:**

[Parágrafo 1: 5-7 linhas explicando detalhadamente a estrutura do tipo legal, conduta tipificada e elementos objetivos]

[Parágrafo 2: 5-7 linhas sobre os sujeitos ativo e passivo, bem como capacidade de ser sujeito]

[Parágrafo 3: 5-7 linhas sobre o bem jurídico tutelado e sua relevância constitucional]

**Requisitos de Aplicação:**

• **Requisito 1 - [Nome]**: [4-5 linhas explicando em detalhes]

• **Requisito 2 - [Nome]**: [4-5 linhas explicando em detalhes]

• **Requisito 3 - [Nome]**: [4-5 linhas explicando em detalhes]

---

### **§ 1º - [Título Descritivo do Parágrafo]**

> "[Citar EXATAMENTE o § 1º conforme a lei]"

**Análise Detalhada:**

[Parágrafo 1: 5-7 linhas explicando o que este parágrafo adiciona ou modifica em relação ao caput]

[Parágrafo 2: 5-7 linhas sobre quando e como se aplica este parágrafo especificamente]

[Parágrafo 3: 5-7 linhas sobre diferenças práticas e consequências jurídicas]

> **⚠️ ATENÇÃO**: [2-3 linhas com ponto crítico de aplicação deste parágrafo]

---

[REPETIR estrutura acima para ABSOLUTAMENTE TODOS parágrafos, incisos e alíneas presentes no artigo]

---

## 💼 Casos Práticos e Aplicação

### Caso Prático 1: [Título Específico da Situação]

**Contexto Fático:**
[5-6 linhas descrevendo situação concreta e detalhada]

**Aplicação do Artigo:**
[5-6 linhas explicando como o artigo se aplica especificamente a este caso]

**Consequências Jurídicas:**
[4-5 linhas sobre os efeitos legais e práticos]

---

## 📚 Jurisprudência Relevante

### 🏛️ STF - [Tema da Decisão]

> **Ementa Resumida**: "[Citar parte relevante da ementa]"

**Análise:**
[5-6 linhas explicando o impacto desta decisão na interpretação do artigo]

---

## 🚨 Pontos Críticos de Atenção

> **🚨 CRÍTICO 1**: [Título do Ponto - 2-3 linhas]

[Parágrafo: 5-6 linhas explicando detalhadamente por que este ponto é crítico e como lidar com ele na prática]

---

## ❌ 5 Erros Mais Comuns na Aplicação

**1. [Nome do Erro Específico]**

- **O que é**: [2-3 linhas definindo o erro]
- **Por que acontece**: [3-4 linhas explicando a causa]
- **Como evitar**: [3-4 linhas com orientação prática]

---

## 📌 Síntese Final e Consolidação

[Parágrafo 1: 5-7 linhas fazendo síntese completa do artigo e sua importância]

[Parágrafo 2: 5-7 linhas destacando os aspectos mais relevantes para aplicação prática]

[Parágrafo 3: 5-7 linhas com orientação final e conclusão]

> **💡 FRASE-CHAVE PARA MEMORIZAÇÃO**: [Resumo ultra-conciso em 1-2 linhas que capture a essência do artigo]

---

REGRAS FINAIS OBRIGATÓRIAS:
- Markdown SEMPRE correto e hierárquico
- Linha vazia entre TODOS parágrafos e seções
- Parágrafos NUNCA menores que 4 linhas
- Use > SEMPRE para citações legais
- Use --- para separar seções principais
- DESDOBRAR absolutamente TODOS parágrafos, incisos e alíneas do artigo`,
      
      explicacao_resumido: `Você é um professor de Direito que explica de forma clara, objetiva e completa, mas concisa.

ARTIGO A SER EXPLICADO:
${artigo}

INSTRUÇÕES CRÍTICAS:
1. Explique de forma SINTÉTICA mas mantendo COMPLETUDE dos pontos essenciais
2. Use markdown estruturado CORRETAMENTE
3. Parágrafos de 4-5 linhas SEMPRE
4. Inclua exemplo prático CONCRETO
5. Destaque apenas os pontos MAIS relevantes
6. Máximo 700 palavras (seja conciso mas completo)
7. Linha vazia entre seções
8. Use > para citações da lei

ESTRUTURA OBRIGATÓRIA:

# 📖 ${artigoTitulo}

---

## 🎯 Essência do Artigo

[Parágrafo 1: 4-5 linhas explicando o núcleo central do artigo e sua função no ordenamento jurídico]

[Parágrafo 2: 4-5 linhas sobre a aplicação prática e relevância]

---

## 📋 Texto da Lei

> ${artigo}

---

## 🔑 Pontos-Chave

**1. [Primeiro Ponto Essencial]**: [4-5 linhas explicando detalhadamente]

**2. [Segundo Ponto]**: [4-5 linhas de explicação técnica clara]

**3. [Terceiro Ponto]**: [4-5 linhas sobre aspecto importante]

**4. [Quarto Ponto]**: [4-5 linhas com informação relevante]

---

## 💼 Aplicação Prática

[Parágrafo 1: 4-5 linhas com exemplo concreto do mundo real]

[Parágrafo 2: 4-5 linhas explicando as consequências práticas da aplicação]

---

## ⚠️ Atenção - Ponto Crítico

> **IMPORTANTE**: [2-3 linhas com alerta sobre aspecto crítico da aplicação]

[Parágrafo: 3-4 linhas desenvolvendo o alerta e orientando sobre cuidados necessários]

---

## ✅ Resumo Final

[Parágrafo 1: 3-4 linhas consolidando os pontos principais]

[Parágrafo 2: 3-4 linhas com conclusão prática]

> **💡 LEMBRE-SE**: [Síntese ultra-concisa em 1-2 linhas]

IMPORTANTE: Mantenha dentro do limite de 700 palavras, mas NÃO sacrifique a qualidade - seja conciso mas preciso.`,

      explicacao_simples_menor16: `Você é um educador especializado em explicar Direito de forma EXTREMAMENTE SIMPLES e acessível para adolescentes de 12-16 anos.

ARTIGO A SER EXPLICADO:
${artigo}

INSTRUÇÕES OBRIGATÓRIAS - CRÍTICAS:
1. LINGUAGEM SUPER SIMPLES - explique como se estivesse conversando com seu irmão/irmã mais novo(a)
2. ZERO juridiquês - se aparecer algum termo técnico, explique IMEDIATAMENTE de forma ultra-simples
3. Use MUITAS analogias com coisas que adolescentes conhecem (escola, TikTok, Instagram, WhatsApp, jogos, YouTube)
4. Tom SUPER CASUAL tipo "sabe quando...", "tipo assim", "olha só", "é tipo quando", "imagina que"
5. Parágrafos de 4-5 linhas mantendo linguagem super acessível
6. Exemplos SEMPRE com situações reais que adolescentes vivenciam
7. Use emojis estrategicamente para deixar mais leve
8. NUNCA use termos como "dispositivo legal", "ordenamento jurídico", "preceitua" - use palavras do dia a dia

ESTRUTURA OBRIGATÓRIA:

# 🎓 ${artigoTitulo.replace(/Art\. \d+/g, 'Lei').replace(/º/, '')} 

---

## 🤔 O Que Isso Significa?

[Parágrafo 1: 4-5 linhas explicando em linguagem de adolescente, super simples, o que é este artigo]

[Parágrafo 2: 4-5 linhas continuando a explicação de forma ainda mais clara, usando comparações]

[Parágrafo 3: 4-5 linhas mostrando por que isso é importante pro dia a dia]

**Pensa assim**: [3-4 linhas com analogia super clara usando TikTok, Instagram, games ou coisas que todo adolescente conhece]

---

## 📝 O Que a Lei Diz (Texto Original)

> ${artigo}

**Traduzindo para Linguagem Normal:**

[Parágrafo 1: 4-5 linhas explicando o que o artigo diz, mas com ZERO palavras difíceis]

[Parágrafo 2: 4-5 linhas continuando a tradução, como se estivesse explicando pra um amigo no recreio]

[Parágrafo 3: 3-4 linhas finalizando a explicação simples]

---

## 💡 Explicação Super Fácil

### O Básico que Você Precisa Saber

[Parágrafo 1: 4-5 linhas explicando o básico com linguagem ultra-simples]

[Parágrafo 2: 4-5 linhas com mais detalhes mas ainda super fácil de entender]

[Parágrafo 3: 4-5 linhas dando exemplos gerais do dia a dia]

### Como Isso Te Afeta

[Parágrafo 1: 4-5 linhas mostrando como isso impacta a vida de um adolescente]

[Parágrafo 2: 4-5 linhas com situações específicas que podem acontecer]

---

## 🎮 Exemplos do Seu Dia a Dia

### **Situação 1 - Na Escola** 📚

[4-5 linhas com exemplo concreto de algo que pode acontecer na escola e como este artigo se aplica]

### **Situação 2 - Em Casa com a Família** 🏠

[4-5 linhas com exemplo de situação familiar que todo adolescente entende]

### **Situação 3 - Online (Redes Sociais/Games)** 📱

[4-5 linhas com exemplo envolvendo internet, redes sociais ou jogos online]

### **Situação 4 - Com Amigos** 👥

[4-5 linhas com exemplo de situação entre amigos]

---

## 🎯 Resumindo Tudo

[Parágrafo 1: 3-4 linhas fazendo resumo super simples de tudo]

[Parágrafo 2: 3-4 linhas com mensagem final fácil de lembrar]

**Em uma frase que dá pra guardar**: [Síntese ultra-simples em 1 linha que capture a essência]

---

REGRAS CRÍTICAS FINAIS:
- NUNCA use palavras difíceis ou jurídicas sem explicar
- Use SEMPRE analogias com coisas que adolescentes conhecem
- Tom de conversa casual, nunca formal
- Emojis para tornar mais leve
- Exemplos SEMPRE com situações que adolescentes vivem
- Se tiver que escolher entre precisão técnica e clareza, escolha CLAREZA`,

      explicacao_simples_maior16: `Você é um educador jurídico especializado em explicar Direito de forma clara e acessível para adultos sem formação jurídica.

ARTIGO A SER EXPLICADO:
${artigo}

INSTRUÇÕES OBRIGATÓRIAS:
1. Linguagem CLARA, DIRETA e PROFISSIONAL - mas SEM juridiquês desnecessário
2. Use exemplos do cotidiano adulto (trabalho, contratos, compra/venda, família, trânsito)
3. Explique termos técnicos SEMPRE que aparecerem, de forma simples
4. Tom profissional mas acessível e respeitoso
5. Parágrafos de 4-5 linhas mantendo clareza
6. Foco em aplicação prática no dia a dia
7. Use > para citações da lei

ESTRUTURA OBRIGATÓRIA:

# 🎓 ${artigoTitulo}

---

## 🤔 Entendendo o Artigo

[Parágrafo 1: 4-5 linhas explicando de forma clara e objetiva o que este artigo regula]

[Parágrafo 2: 4-5 linhas sobre a importância prática deste artigo no cotidiano]

[Parágrafo 3: 4-5 linhas contextualizando quando e como se aplica]

**Para facilitar a compreensão**: [3-4 linhas com analogia do cotidiano adulto que todos entendem]

---

## 📝 Texto da Lei

> ${artigo}

**Em palavras mais simples:**

[Parágrafo 1: 4-5 linhas traduzindo o artigo para linguagem clara, sem juridiquês]

[Parágrafo 2: 4-5 linhas continuando a explicação acessível]

[Parágrafo 3: 3-4 linhas finalizando a tradução em linguagem simples]

---

## 💡 Explicação Clara e Acessível

### O Que Você Precisa Saber

[Parágrafo 1: 4-5 linhas explicando os pontos principais de forma clara]

[Parágrafo 2: 4-5 linhas detalhando aspectos importantes]

[Parágrafo 3: 4-5 linhas sobre consequências práticas]

### Como Isso Funciona na Prática

[Parágrafo 1: 4-5 linhas explicando a aplicação concreta]

[Parágrafo 2: 4-5 linhas com orientações práticas]

---

## 💼 Situações Práticas do Cotidiano

### **No Ambiente de Trabalho** 👔

[4-5 linhas com exemplo concreto de situação profissional/trabalhista]

### **Em Contratos e Negócios** 📄

[4-5 linhas com exemplo envolvendo contratos, compras, vendas ou serviços]

### **Em Relações Familiares** 👨‍👩‍👧‍👦

[4-5 linhas com exemplo de situação familiar ou pessoal]

### **No Dia a Dia** 🏙️

[4-5 linhas com exemplo de situação cotidiana comum]

---

## ⚠️ Pontos de Atenção

> **IMPORTANTE SABER**: [2-3 linhas com alerta prático relevante]

[Parágrafo: 3-4 linhas explicando cuidados necessários e orientações]

---

## 🎯 Resumo e Orientação Final

[Parágrafo 1: 4-5 linhas consolidando o entendimento do artigo]

[Parágrafo 2: 4-5 linhas com orientação prática e conclusão]

**Conclusão em poucas palavras**: [Síntese clara e objetiva em 1-2 linhas]

---

REGRAS FINAIS:
- Clareza acima de tudo, mas mantenha profissionalismo
- Exemplos SEMPRE do mundo adulto real
- Explique termos técnicos quando usá-los
- Foco em como isso afeta a vida prática
- Tom respeitoso e educativo`,

      exemplo: `Você é um professor de Direito experiente. Crie exemplos práticos EXTREMAMENTE DETALHADOS aplicando o artigo:

${artigo}

FORMATO OBRIGATÓRIO:

# 💼 Casos Práticos Completos: ${artigoTitulo}

---

## 📋 Caso Prático 1: [Título Descritivo e Específico]

### 📍 Contexto e Fatos

[Parágrafo 1: 5-7 linhas descrevendo a situação inicial detalhadamente]

[Parágrafo 2: 5-7 linhas sobre as partes envolvidas e seus interesses]

[Parágrafo 3: 5-7 linhas detalhando o contexto fático completo]

### 📋 O Problema Jurídico

[Parágrafo: 4-5 linhas identificando claramente a questão a ser resolvida]

### ⚖️ Aplicação do Artigo

[Parágrafo 1: 5-7 linhas explicando como o artigo incide no caso]

> ${artigo}

[Parágrafo 2: 5-7 linhas sobre a subsunção do fato à norma]

[Parágrafo 3: 5-7 linhas analisando cada requisito legal]

### 🎯 Consequências Jurídicas

[Parágrafo 1: 5-7 linhas sobre os efeitos práticos]

[Parágrafo 2: 5-7 linhas sobre direitos e obrigações gerados]

### ✅ Solução e Desfecho

[Parágrafo 1: 5-7 linhas explicando como foi resolvido]

[Parágrafo 2: 4-5 linhas sobre o resultado final]

---

[REPETIR estrutura acima para mais 3 casos práticos COMPLETAMENTE DIFERENTES]

---

## 🎯 Análise Comparativa dos Casos

[Parágrafo 1: 5-7 linhas comparando semelhanças]

[Parágrafo 2: 5-7 linhas destacando diferenças]

[Parágrafo 3: 5-7 linhas sobre padrões identificados]

---

## 📌 Síntese Final

[Parágrafo: 5-7 linhas consolidando todos os aprendizados]

REGRAS CRÍTICAS:
- Sempre separe parágrafos com linha vazia
- Crie 4 casos práticos MUITO diferentes entre si
- Parágrafos de 5-7 linhas (não 3-4!)
- Use # para título, ## para casos, ### para subsections
- Use blockquote para citar o artigo
- Seja EXTREMAMENTE detalhado em cada caso
- Mínimo de 2000 palavras no total`
    };

    let promptKey: string;
    if (tipo === "explicacao") {
      if (nivel === "resumido") {
        promptKey = "explicacao_resumido";
      } else if (nivel === "simples") {
        promptKey = faixaEtaria === "menor16" ? "explicacao_simples_menor16" : "explicacao_simples_maior16";
      } else {
        promptKey = "explicacao_tecnico";
      }
    } else {
      promptKey = "exemplo";
    }
    
    const prompt = prompts[promptKey] || prompts.explicacao_tecnico;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:streamGenerateContent?key=${DIREITO_PREMIUM_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.2, // Mais determinístico para melhor qualidade - Sprint 2
            maxOutputTokens: nivel === 'tecnico' ? 8000 : nivel === 'resumido' ? 2000 : 3000,
            topP: 0.8,
            topK: 40
          }
        }),
      }
    );
    
    console.log('📡 Resposta da API Gemini - Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro da API:', response.status, errorText);
      throw new Error(`Erro da API Gemini: ${response.status}`);
    }

    // Transform Gemini stream to SSE format
    console.log('🔄 Iniciando processamento do stream...');
    let buffer = '';
    let totalContentSent = 0;
    let fullContent = '';
    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        buffer += text;
        
        // Try to extract complete JSON objects from buffer
        let startIdx = 0;
        while (startIdx < buffer.length) {
          // Find start of JSON object
          const objStart = buffer.indexOf('{', startIdx);
          if (objStart === -1) break;
          
          // Try to find matching closing brace
          let braceCount = 0;
          let objEnd = -1;
          for (let i = objStart; i < buffer.length; i++) {
            if (buffer[i] === '{') braceCount++;
            if (buffer[i] === '}') {
              braceCount--;
              if (braceCount === 0) {
                objEnd = i + 1;
                break;
              }
            }
          }
          
          // If we found a complete JSON object
          if (objEnd !== -1) {
            const jsonStr = buffer.substring(objStart, objEnd);
            try {
              const data = JSON.parse(jsonStr);
              const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
              
              if (content && content.trim().length > 0) {
                fullContent += content;
                totalContentSent++;
                if (totalContentSent === 1) {
                  console.log('✅ Primeiro conteúdo enviado:', content.substring(0, 100));
                }
                if (totalContentSent % 10 === 0) {
                  console.log(`📤 ${totalContentSent} chunks enviados`);
                }
                const sseData = JSON.stringify({
                  choices: [{ delta: { content } }]
                });
                controller.enqueue(new TextEncoder().encode(`data: ${sseData}\n\n`));
              }
            } catch (e) {
              console.error('❌ Erro ao parsear JSON:', e);
            }
            
            // Remove processed part from buffer
            buffer = buffer.substring(objEnd);
            startIdx = 0;
          } else {
            // No complete object found, wait for more data
            break;
          }
        }
        
        // Keep buffer manageable
        if (buffer.length > 50000) {
          console.error('⚠️ Buffer muito grande, limpando:', buffer.length);
          buffer = buffer.substring(buffer.length - 10000);
        }
      },
      
      async flush(controller) {
        // Send [DONE] marker
        controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
        console.log('✅ Stream finalizado - Total de chunks:', totalContentSent);
        
        // Limitar conteúdo a 8000 caracteres se exceder
        let contentToSave = fullContent;
        if (contentToSave.length > 8000) {
          console.log(`⚠️ Conteúdo excedeu 8000 caracteres (${contentToSave.length}), truncando...`);
          // Cortar em 8000 e procurar último parágrafo completo
          contentToSave = contentToSave.substring(0, 8000);
          const lastParagraph = contentToSave.lastIndexOf('\n\n');
          if (lastParagraph > 7500) {
            contentToSave = contentToSave.substring(0, lastParagraph);
          }
          console.log(`✂️ Conteúdo truncado para ${contentToSave.length} caracteres`);
        }
        
        // Salvar no banco após streaming completo (funciona para TODOS os códigos)
        if (tableName && numeroArtigo && contentToSave.trim().length > 100) {
          try {
            console.log(`💾 Tentando salvar cache: tabela="${tableName}", numeroArtigo="${numeroArtigo}", coluna="${coluna}", tamanho=${contentToSave.length}`);
            
            const { data: updateResult, error: updateError } = await supabase
              .from(tableName)
              .update({ 
                [coluna]: contentToSave,
                ultima_atualizacao: new Date().toISOString()
              })
              .eq('Número do Artigo', numeroArtigo)
              .select();
            
            if (updateError) {
              console.error('❌ Erro ao salvar cache:', updateError);
            } else if (updateResult && updateResult.length > 0) {
              console.log(`✅ Cache salvo com sucesso [${tableName}] - ${updateResult.length} registro(s) atualizado(s)`);
              console.log(`📊 Próximos requests usarão cache (0 tokens)`);
            } else {
              console.log(`⚠️ Update executado mas nenhum registro foi atualizado. Verifique se o artigo existe na tabela.`);
            }
          } catch (e) {
            console.error('❌ Exceção ao salvar no banco:', e);
          }
        } else {
          console.log(`⚠️ Não foi possível salvar cache - tableName="${tableName}", numeroArtigo="${numeroArtigo}", tamanhoConteudo=${contentToSave.trim().length}`);
        }
      }
    });

    return new Response(response.body?.pipeThrough(transformStream), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Erro ao gerar conteúdo:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        conteudo: 'Desculpe, ocorreu um erro ao gerar o conteúdo. Por favor, tente novamente.'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
