import { useState, useRef, useEffect } from "react";
import { Send, X, Loader2, ArrowLeft, Image, FileText, BookOpen, Scale, GraduationCap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card } from "@/components/ui/card";
import { toast as sonnerToast } from "sonner";
import { MessageActionsChat } from "@/components/MessageActionsChat";
import ChatFlashcardsModal from "@/components/ChatFlashcardsModal";
import ChatQuestoesModal from "@/components/ChatQuestoesModal";

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}
interface UploadedFile {
  name: string;
  type: string;
  data: string;
}
type ChatMode = "study" | "realcase" | "psychologist" | "tcc" | "refutacao";
const ChatProfessora = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") as ChatMode || "study";
  const [mode, setMode] = useState<ChatMode>(initialMode);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [showFlashcardsModal, setShowFlashcardsModal] = useState(false);
  const [showQuestoesModal, setShowQuestoesModal] = useState(false);
  const [currentContent, setCurrentContent] = useState("");
  
  // Auto-scroll apenas durante streaming
  useEffect(() => {
    // Só rola se estiver carregando ou se a última mensagem estiver em streaming
    const lastMessage = messages[messages.length - 1];
    const shouldScroll = isLoading || lastMessage?.isStreaming;
    
    if (shouldScroll) {
      const scrollToBottom = () => {
        if (scrollRef.current) {
          const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
          if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
          }
        }
      };
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isLoading]);
  const handleModeChange = (newMode: ChatMode) => {
    setMode(newMode);
    setMessages([]);
    setInput("");
    setUploadedFiles([]);
  };
  const handleFileSelect = async (file: File, expectedType: "image" | "pdf") => {
    if (expectedType === "image" && !file.type.includes("image/")) {
      toast({
        title: "Tipo de arquivo incorreto",
        description: "Por favor, envie apenas imagens",
        variant: "destructive"
      });
      return;
    }
    if (expectedType === "pdf" && file.type !== "application/pdf") {
      toast({
        title: "Tipo de arquivo incorreto",
        description: "Por favor, envie apenas PDFs",
        variant: "destructive"
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      const base64 = event.target?.result as string;
      setUploadedFiles(prev => [...prev, {
        name: file.name,
        type: file.type,
        data: base64
      }]);
    };
    reader.readAsDataURL(file);
  };
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };
  const streamResponse = async (userMessage: string, streamMode: 'chat' | 'lesson' = 'chat') => {
    if (streamMode === 'chat') {
      setIsLoading(true);
    } else {
      setIsCreatingLesson(true);
    }
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage
    };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    // Criar mensagem assistente vazia para streaming
    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
      isStreaming: true
    };
    setMessages([...updatedMessages, assistantMessage]);
    try {
      abortControllerRef.current = new AbortController();
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      const response = await fetch(`https://izspjvegxdfgkgibpyst.supabase.co/functions/v1/chat-professora`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
          'Authorization': `Bearer ${session?.access_token || ''}`
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content
          })),
          files: uploadedFiles,
          mode: mode
        }),
        signal: abortControllerRef.current.signal
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Edge function error:', response.status, errorText);
        if (response.status === 429) {
          throw new Error('Limite de perguntas atingido. Aguarde alguns minutos.');
        }
        if (response.status === 402) {
          throw new Error('Créditos insuficientes. Por favor, adicione créditos à sua conta.');
        }
        throw new Error(`Erro ao processar sua pergunta (${response.status})`);
      }
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let buffer = '';
      if (reader) {
        while (true) {
          const {
            done,
            value
          } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, {
            stream: true
          });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            let payloadStr = trimmed;
            if (trimmed.startsWith('data:')) {
              payloadStr = trimmed.slice(5).trim();
              if (payloadStr === '[DONE]') continue;
            }
            try {
              const parsed = JSON.parse(payloadStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                accumulatedText += content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: accumulatedText,
                    isStreaming: true
                  };
                  return newMessages;
                });
              }
            } catch {
              // Fallback: append raw text when not JSON (non-SSE providers)
              accumulatedText += payloadStr;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: accumulatedText,
                  isStreaming: true
                };
                return newMessages;
              });
            }
          }
        }
      }

      // Finalizar streaming
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: 'assistant',
          content: accumulatedText,
          isStreaming: false
        };
        return newMessages;
      });
      setUploadedFiles([]);
    } catch (error: any) {
      console.error('Erro no streaming:', error);
      if (error.name !== 'AbortError') {
        sonnerToast.error(error.message || 'Erro ao processar sua pergunta');
        setMessages(prev => prev.slice(0, -1));
      }
    } finally {
      if (streamMode === 'chat') {
        setIsLoading(false);
      } else {
        setIsCreatingLesson(false);
      }
      abortControllerRef.current = null;
    }
  };
  const sendMessage = async () => {
    if (!input.trim() && uploadedFiles.length === 0) return;
    
    // Se houver arquivos anexados, instrui análise automática
    let messageText = input.trim();
    if (uploadedFiles.length > 0 && !messageText) {
      messageText = "Por favor, analise o conteúdo anexado e me diga do que se trata. Depois me pergunte o que eu gostaria de saber ou fazer com esse conteúdo.";
    }
    
    setInput("");
    await streamResponse(messageText, 'chat');
  };
  const handleCreateLesson = async (content: string) => {
    const topic = messages.find(m => m.role === 'user')?.content || 'este tema';
    const lessonPrompt = `Crie uma aula COMPLETA e DETALHADA sobre: ${topic}`;
    await streamResponse(lessonPrompt, 'lesson');
  };

  const handleSummarize = async (content: string) => {
    // Envia "Resuma para mim" automaticamente
    await streamResponse("Resuma para mim", 'chat');
  };

  const handleGenerateFlashcards = (content: string) => {
    setCurrentContent(content);
    setShowFlashcardsModal(true);
  };

  const handleGenerateQuestions = (content: string) => {
    setCurrentContent(content);
    setShowQuestoesModal(true);
  };

  // Perguntas comuns pré-definidas - todas as opções
  const allQuestions = [
    "Qual a diferença entre dolo e culpa?",
    "O que é presunção de inocência?",
    "Explique o princípio da legalidade",
    "Diferença entre crime doloso e culposo",
    "O que são direitos fundamentais?",
    "Explique ação direta de inconstitucionalidade",
    "Diferença entre tutela e curatela",
    "O que é responsabilidade civil?",
    "Explique a prescrição penal",
    "O que é legítima defesa?"
  ];

  // Selecionar 4 perguntas aleatórias a cada renderização da tela inicial
  const [commonQuestions] = useState(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  });
  const renderWelcomeScreen = () => {
    if (mode === "study") {
      return <div className="flex flex-col items-center justify-center h-full space-y-6 pb-20 px-4">
          <div className="text-center space-y-4 max-w-2xl">
            <div className="bg-primary/10 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Assistente de Estudo</h2>
            
            <div className="text-left space-y-3 bg-card border border-border rounded-lg p-4">
              <p className="font-semibold">📚 O que posso fazer:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Esclarecer dúvidas sobre direito brasileiro</li>
                <li>• Analisar documentos jurídicos (PDF)</li>
                <li>• Interpretar imagens de textos legais</li>
                <li>• Explicar conceitos e artigos de forma didática</li>
                <li>• Citar legislação e jurisprudência relevante</li>
                <li>• Gerar flashcards e questões de estudo</li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                💡 Dúvidas Comuns - Clique para perguntar:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {commonQuestions.map((question, index) => (
                  <Card 
                    key={index}
                    className="p-3 cursor-pointer hover:bg-accent/10 transition-colors text-left border-accent/30"
                    onClick={() => {
                      setInput(question);
                      setTimeout(() => sendMessage(), 100);
                    }}
                  >
                    <p className="text-[15px] leading-relaxed">{question}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>;
    } else {
      return <div className="flex flex-col items-center justify-center h-full space-y-6 pb-20 px-4">
          <div className="text-center space-y-3">
            <div className="bg-primary/10 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <Scale className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Assistente de Caso Real</h2>
            
            <div className="max-w-md text-left space-y-3 bg-card border border-border rounded-lg p-4">
              <p className="font-semibold">⚖️ Como funciona:</p>
              <p className="text-sm text-muted-foreground">
                Descreva sua situação e receba orientações práticas sobre seus direitos e próximos passos.
              </p>
            </div>

            <div className="max-w-md space-y-3">
              <p className="text-sm font-semibold">💡 Exemplos para testar:</p>
              <Card className="p-3 cursor-pointer hover:bg-accent/10 transition-colors text-left" onClick={() => setInput("Meu carro foi atingido na traseira enquanto estava parado no sinal. O outro motorista não quer pagar os danos. O que eu faço?")}>
                <p className="text-sm">Meu carro foi atingido na traseira enquanto estava parado no sinal. O outro motorista não quer pagar os danos. O que eu faço?</p>
              </Card>
              <Card className="p-3 cursor-pointer hover:bg-accent/10 transition-colors text-left" onClick={() => setInput("Comprei um celular que veio com defeito. A loja não quer trocar nem devolver meu dinheiro. Quais são meus direitos?")}>
                <p className="text-sm">Comprei um celular que veio com defeito. A loja não quer trocar nem devolver meu dinheiro. Quais são meus direitos?</p>
              </Card>
              <Card className="p-3 cursor-pointer hover:bg-accent/10 transition-colors text-left" onClick={() => setInput("Fui demitido sem justa causa mas não recebi todas as verbas rescisórias. Como proceder?")}>
                <p className="text-sm">Fui demitido sem justa causa mas não recebi todas as verbas rescisórias. Como proceder?</p>
              </Card>
            </div>

            <div className="max-w-md bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <p className="text-sm">
                <strong>Receberá:</strong> Explicação dos seus direitos com citações de artigos de leis, documentos necessários, prazos importantes e sugestão de próximos passos.
              </p>
            </div>
          </div>
        </div>;
    }
  };
  return <div className="flex flex-col h-screen bg-background">
      <ChatFlashcardsModal
        isOpen={showFlashcardsModal}
        onClose={() => setShowFlashcardsModal(false)}
        content={currentContent}
      />
      <ChatQuestoesModal
        isOpen={showQuestoesModal}
        onClose={() => setShowQuestoesModal(false)}
        content={currentContent}
      />
      
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Professora Jurídica</h1>
          </div>
        </div>
        
        <Tabs value={mode} onValueChange={v => handleModeChange(v as ChatMode)}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="study" className="gap-2 text-xs md:text-sm"><BookOpen className="w-4 h-4" />Estudo</TabsTrigger>
            <TabsTrigger value="realcase" className="gap-2 text-xs md:text-sm"><Scale className="w-4 h-4" />Caso Real</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 px-4 py-4">
          {messages.length === 0 ? renderWelcomeScreen() : <>
            {messages.map((message, index) => <div key={index} className={cn("mb-4 flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[85%] rounded-2xl px-4 py-3", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  {message.role === "assistant" ? <>
                      <div className="prose prose-sm max-w-none dark:prose-invert prose-p:text-[15px] prose-p:leading-[1.4] prose-p:text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-[15px]">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({children}) => {
                              const text = String(children);
                              // Não renderizar linhas de SUGESTÕES
                              if (text.includes('[SUGESTÕES]') || text.includes('[/SUGESTÕES]')) {
                                return null;
                              }
                              return <p className="text-[15px] leading-[1.4]">{children}</p>;
                            }
                          }}
                        >
                          {message.content.replace(/\[SUGESTÕES\][\s\S]*?\[\/SUGESTÕES\]/g, '')}
                        </ReactMarkdown>
                        {message.isStreaming && <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1">|</span>}
                      </div>
                      
                      {!message.isStreaming && index === messages.length - 1 && (() => {
                        // Extrair sugestões se existirem
                        const suggestionsMatch = message.content.match(/\[SUGESTÕES\]([\s\S]*?)\[\/SUGESTÕES\]/);
                        const suggestions = suggestionsMatch 
                          ? suggestionsMatch[1]
                              .split('\n')
                              .map(s => s.trim())
                              .filter(s => s && !s.includes('[') && !s.includes(']'))
                          : [];

                        return (
                          <>
                            {/* Sugestões como balões clicáveis */}
                            {suggestions.length > 0 && (
                              <div className="mt-4 space-y-2">
                                <p className="text-xs font-semibold text-muted-foreground">💡 Sugestões de perguntas:</p>
                                <div className="flex flex-wrap gap-2">
                                  {suggestions.map((suggestion, idx) => (
                                    <Card
                                      key={idx}
                                      className="cursor-pointer hover:bg-accent/20 transition-colors border-accent/30 px-3 py-2"
                                      onClick={() => {
                                        setInput(suggestion);
                                        setTimeout(() => sendMessage(), 100);
                                      }}
                                    >
                                      <p className="text-[14px]">{suggestion}</p>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Barra de ações */}
                            <MessageActionsChat
                              content={message.content.replace(/\[SUGESTÕES\][\s\S]*?\[\/SUGESTÕES\]/g, '')}
                              onCreateLesson={() => handleCreateLesson(message.content)}
                              onSummarize={() => handleSummarize(message.content)}
                              onGenerateFlashcards={() => handleGenerateFlashcards(message.content)}
                              onGenerateQuestions={() => handleGenerateQuestions(message.content)}
                            />
                          </>
                        );
                      })()}
                    </> : <p className="text-[15px] leading-[1.4] whitespace-pre-wrap">{message.content}</p>}
                </div>
              </div>)}
            {isLoading && <div className="flex justify-start mb-4">
                <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-[15px]">Pensando...</span>
                </div>
              </div>}
          </>}
      </ScrollArea>

      {uploadedFiles.length > 0 && <div className="px-4 py-2 border-t border-border bg-card">
          <div className="flex flex-wrap gap-2">
            {uploadedFiles.map((file, index) => <div key={index} className="flex items-center gap-2 bg-accent/10 rounded-lg px-3 py-2 text-sm">
                {file.type.includes("image") ? <Image className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                <span className="max-w-[120px] truncate">{file.name}</span>
                <button onClick={() => removeFile(index)}><X className="w-4 h-4 text-muted-foreground hover:text-foreground" /></button>
              </div>)}
          </div>
        </div>}

      <div className="border-t border-border bg-card px-4 py-3 space-y-3">
        <div className="flex gap-2">
          <input ref={imageInputRef} type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleFileSelect(e.target.files[0], "image")} className="hidden" />
          <button onClick={() => imageInputRef.current?.click()} disabled={isLoading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-accent/20 hover:bg-accent/30 transition-colors border border-border disabled:opacity-50 disabled:cursor-not-allowed">
            <Image className="w-4 h-4" /><span className="text-sm font-medium">Analisar Imagem</span>
          </button>
          <input ref={pdfInputRef} type="file" accept="application/pdf" onChange={e => e.target.files?.[0] && handleFileSelect(e.target.files[0], "pdf")} className="hidden" />
          <button onClick={() => pdfInputRef.current?.click()} disabled={isLoading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-accent/20 hover:bg-accent/30 transition-colors border border-border disabled:opacity-50 disabled:cursor-not-allowed">
            <FileText className="w-4 h-4" /><span className="text-sm font-medium">Analisar PDF</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }} placeholder="Digite sua pergunta..." disabled={isLoading || isCreatingLesson} className="flex-1" />
          <Button onClick={sendMessage} disabled={isLoading || isCreatingLesson || !input.trim() && uploadedFiles.length === 0} size="icon">
            {isLoading || isCreatingLesson ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>;
};
export default ChatProfessora;