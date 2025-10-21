import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, files, mode, extractedText } = await req.json();
    const DIREITO_PREMIUM_API_KEY = Deno.env.get('DIREITO_PREMIUM_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!DIREITO_PREMIUM_API_KEY) {
      throw new Error('DIREITO_PREMIUM_API_KEY não configurada');
    }

    // Criar cliente Supabase para buscar dados da CF
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Detectar menções a artigos da CF
    const lastUserMessage = messages[messages.length - 1];
    let cfContext = '';
    const hasFiles = files && files.length > 0;
    
    // Se há arquivos anexados, adicionar instrução especial de análise
    let fileAnalysisPrefix = '';
    if (hasFiles) {
      fileAnalysisPrefix = `\n\n**IMPORTANTE - ARQUIVO ANEXADO:**
Você recebeu um arquivo real (imagem ou PDF). Você DEVE analisar o CONTEÚDO REAL do arquivo.

${extractedText ? `**TEXTO EXTRAÍDO DO PDF:**\n${extractedText}\n\n` : ''}

Sua resposta DEVE:
1. Descrever EXATAMENTE o que você vê/lê no arquivo (não invente nada)
2. Extrair textos visíveis se for imagem
3. Resumir os pontos principais encontrados NO ARQUIVO
4. Perguntar à pessoa o que ela gostaria de fazer com esse conteúdo
5. Nas sugestões [SUGESTÕES], oferecer perguntas específicas baseadas no CONTEÚDO REAL analisado

**NUNCA invente conteúdo que não está no arquivo!**\n`;
    }
    
    // Regex para detectar artigos (art. 5º, artigo 5, art 5, etc)
    const articleRegex = /art(?:igo)?\.?\s*(\d+)/gi;
    const articleMatches = lastUserMessage?.content?.match(articleRegex);
    
    if (articleMatches) {
      console.log('Artigos detectados:', articleMatches);
      
      // Buscar cada artigo mencionado
      for (const match of articleMatches) {
        const articleNum = match.replace(/art(?:igo)?\.?\s*/gi, '').trim();
        
        const { data: articles } = await supabase
          .from('CF - Constituição Federal')
          .select('*')
          .ilike('Número do Artigo', `%${articleNum}%`)
          .limit(1);
        
        if (articles && articles.length > 0) {
          const article = articles[0];
          cfContext += `\n\n[ARTIGO ${article['Número do Artigo']} DA CF]\n`;
          cfContext += `${article.Artigo}\n`;
          if (article.Narração) cfContext += `Narração: ${article.Narração}\n`;
          if (article.Comentario) cfContext += `Comentário: ${article.Comentario}\n`;
        }
      }
    }

    // Preparar o prompt do sistema baseado no modo
    let systemPrompt = '';
    
    if (mode === 'lesson') {
      systemPrompt = `Você é uma professora de direito altamente experiente criando aulas completas e estruturadas.

MISSÃO: Criar uma aula COMPLETA, DETALHADA e DIDÁTICA sobre o tema solicitado.

ESTRUTURA OBRIGATÓRIA DA AULA:

# 🎯 Objetivos de Aprendizagem
Liste 3-5 objetivos claros do que o aluno aprenderá

# 📖 Introdução
• Contextualize o tema (2-3 parágrafos)
• Explique a importância prática e jurídica
• Apresente a relevância atual

# 📚 Conteúdo Principal

## Conceitos Fundamentais
• Defina todos os termos técnicos
• Explique de forma clara e didática
• Use analogias quando necessário

## Base Legal
• SEMPRE cite artigos específicos das leis aplicáveis
• Explique cada artigo citado em linguagem simples
• Mostre a aplicação prática de cada artigo

## Aprofundamento Jurídico
• Análise doutrinária
• Jurisprudência relevante (cite decisões importantes)
• Debates atuais sobre o tema

# 💡 Exemplos Práticos
Apresente PELO MENOS 3 situações reais detalhadas onde o tema se aplica

# ⚖️ Casos Concretos
Descreva 2-3 casos práticos com:
• Situação fática
• Questão jurídica
• Análise passo a passo
• Resolução fundamentada

# ✅ Resumo e Pontos-Chave
Liste 8-10 pontos essenciais que o aluno DEVE memorizar

# 🎓 Exercícios de Fixação
Crie 5 questões:
• 3 questões de múltipla escolha
• 2 questões dissertativas
• Todas com gabaritos comentados

# 📎 Para Ir Além
• Sugira 3-4 temas relacionados para aprofundamento
• Indique artigos e livros de referência
• Próximos passos no aprendizado

IMPORTANTE:
- Use uma linguagem clara mas técnica quando necessário
- Seja extremamente detalhado e completo
- Cite SEMPRE as bases legais (artigos, leis, códigos)
- Use exemplos práticos e casos reais
- Formate bem o texto com markdown
- Seja didático e organizado

${cfContext ? `\n\nCONTEXTO DA CONSTITUIÇÃO FEDERAL:${cfContext}` : ''}`;
    } else {
      systemPrompt = `Você é uma assistente jurídica especializada em orientar pessoas em situações do dia a dia envolvendo direito brasileiro.

SEU OBJETIVO:
Ajudar pessoas comuns a entenderem seus direitos e saberem como proceder em situações reais da vida cotidiana.

COMO RESPONDER:
1. **Entenda a Situação**: Ouça atentamente o problema relatado
2. **Explique os Direitos**: Diga claramente quais são os direitos da pessoa, SEMPRE citando os artigos específicos das leis brasileiras
3. **Dê o Passo a Passo**: Instrua sobre o que fazer, em ordem de ações
4. **Sugira Documentos**: Liste documentos que podem ser necessários
5. **Mencione Prazos**: Alerte sobre prazos importantes, se houver
6. **Cite a Lei**: SEMPRE mencione a base legal completa:
   - Código Civil (CC): cite artigos quando aplicável
   - Código de Defesa do Consumidor (CDC): cite artigos quando aplicável
   - Consolidação das Leis do Trabalho (CLT): cite artigos quando aplicável
   - Código de Trânsito Brasileiro (CTB): cite artigos quando aplicável
   - Código Penal (CP): cite artigos quando aplicável
   - Constituição Federal: cite artigos quando aplicável
7. **Seja Prático**: Foque em ações concretas que a pessoa pode tomar

IMPORTANTE - CITAÇÃO DE ARTIGOS:
- SEMPRE cite os números dos artigos específicos (Ex: "Art. 186 do Código Civil", "Art. 18 do CDC")
- Explique brevemente o que cada artigo diz
- Use múltiplos artigos quando relevante para fundamentar a resposta
- Cite artigos de diferentes códigos se aplicável ao caso

ESTILO:
- Linguagem clara e acessível (sem juridiquês)
- Tom acolhedor e empático
- Respostas estruturadas e organizadas
- Use exemplos práticos
- Sempre reforce: "Procure um advogado para orientação completa"

${cfContext ? `\n\nCONTEXTO DA CONSTITUIÇÃO FEDERAL:${cfContext}` : ''}
${fileAnalysisPrefix}

**CRÍTICO - Sugestões de Perguntas:**
Ao final de CADA resposta, você DEVE incluir 2-3 sugestões de perguntas/tópicos que a pessoa pode explorar, no formato:

[SUGESTÕES]
Pergunta relevante 1 baseada no contexto?
Pergunta relevante 2 que aprofunda o assunto?
Pergunta relevante 3 relacionada ao tema?
[/SUGESTÕES]


As sugestões devem:
- Ser relevantes ao que a pessoa perguntou
- Aprofundar a conversa
- Oferecer novas perspectivas
- Ser escritas de forma clara e convidativa
${cfContext ? `\n\nCONTEXTO DA CONSTITUIÇÃO FEDERAL:${cfContext}` : ''}`;
    }

    // Construir mensagens no formato Gemini com suporte multimodal
    let geminiContents: any[] = [];
    
    // Adicionar system prompt como primeira mensagem do usuário
    geminiContents.push({
      role: 'user',
      parts: [{ text: systemPrompt }]
    });
    
    // Processar mensagens incluindo arquivos
    for (let i = 0; i < messages.length; i++) {
      const m: any = messages[i];
      const isLastUserMessage = i === messages.length - 1 && m.role === 'user';
      
      if (m.role === 'user') {
        const parts: any[] = [{ text: m.content }];
        
        // Se for a última mensagem do usuário e houver arquivos, adicionar
        if (isLastUserMessage && files && files.length > 0) {
          for (const file of files) {
            const base64Data = file.data.includes('base64,') 
              ? file.data.split('base64,')[1] 
              : file.data;
            
            if (file.type.startsWith('image/')) {
              parts.push({
                inline_data: {
                  mime_type: file.type,
                  data: base64Data
                }
              });
            } else if (file.type === 'application/pdf') {
              // Enviar o PDF inteiro como inline_data para análise real do conteúdo
              parts.push({
                inline_data: {
                  mime_type: 'application/pdf',
                  data: base64Data
                }
              });
            }
          }
        }
        
        geminiContents.push({ role: 'user', parts });
      } else if (m.role === 'assistant') {
        geminiContents.push({
          role: 'model',
          parts: [{ text: m.content }]
        });
      }
    }

    const payload = {
      contents: geminiContents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: mode === 'lesson' ? 4000 : 2000,
      },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:streamGenerateContent?key=${DIREITO_PREMIUM_API_KEY}&alt=sse`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro da API Gemini:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'quota_exceeded',
            message: '⏱️ Limite de perguntas atingido. Por favor, aguarde alguns minutos e tente novamente.'
          }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      throw new Error(`Erro da API Gemini: ${response.status}`);
    }

    // Transformar o stream do Gemini para formato compatível
    const stream = new TransformStream({
      async transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonData = line.slice(6);
              const parsed = JSON.parse(jsonData);
              
              // Extrair o texto do formato Gemini
              const content = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (content) {
                // Converter para formato SSE esperado pelo frontend
                const sseData = `data: ${JSON.stringify({
                  choices: [{
                    delta: { content }
                  }]
                })}\n\n`;
                controller.enqueue(new TextEncoder().encode(sseData));
              }
              
              // Verificar se finalizou
              if (parsed.candidates?.[0]?.finishReason) {
                controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
              }
            } catch (e) {
              console.error('Erro ao processar chunk:', e);
            }
          }
        }
      }
    });

    // Retornar o stream processado
    return new Response(response.body?.pipeThrough(stream), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Erro no chat-professora:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        message: 'Desculpe, ocorreu um erro. Por favor, tente novamente.'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
