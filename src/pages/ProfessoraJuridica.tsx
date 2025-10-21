import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Send, Sparkles, Upload, X, GraduationCap, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
  isStreaming?: boolean;
}

const ProfessoraJuridica = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamResponse = async (userMessage: string, mode: 'chat' | 'lesson' = 'chat') => {
    if (mode === 'chat') {
      setIsLoading(true);
    } else {
      setIsCreatingLesson(true);
    }

    const newUserMessage: Message = { role: 'user', content: userMessage };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    // Criar mensagem assistente vazia para streaming
    const assistantMessage: Message = { role: 'assistant', content: '', isStreaming: true };
    setMessages([...updatedMessages, assistantMessage]);

    try {
      abortControllerRef.current = new AbortController();

      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `https://izspjvegxdfgkgibpyst.supabase.co/functions/v1/chat-professora`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
            'Authorization': `Bearer ${session?.access_token || ''}`,
          },
          body: JSON.stringify({
            messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
            mode: mode === 'lesson' ? 'lesson' : 'realcase'
          }),
          signal: abortControllerRef.current.signal
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Limite de perguntas atingido. Aguarde alguns minutos.');
        }
        throw new Error('Erro ao processar sua pergunta');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let buffer = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
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

    } catch (error: any) {
      console.error('Erro no streaming:', error);
      if (error.name !== 'AbortError') {
        toast.error(error.message || 'Erro ao processar sua pergunta');
        setMessages(prev => prev.slice(0, -1));
      }
    } finally {
      if (mode === 'chat') {
        setIsLoading(false);
      } else {
        setIsCreatingLesson(false);
      }
      abortControllerRef.current = null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageText = input.trim();
    setInput("");
    await streamResponse(messageText, 'chat');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleCreateLesson = async () => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'assistant') return;

    const topic = messages.find(m => m.role === 'user')?.content || 'este tema';
    const lessonPrompt = `Crie uma aula COMPLETA e DETALHADA sobre: ${topic}`;

    await streamResponse(lessonPrompt, 'lesson');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-6 pb-32">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block bg-gradient-to-br from-primary to-accent rounded-2xl p-4 mb-4 shadow-lg animate-scale-in">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Professora Jurídica IA
          </h1>
          <p className="text-muted-foreground text-sm">
            Tire suas dúvidas sobre casos reais do dia a dia
          </p>
        </div>

        {/* Messages */}
        <div className="space-y-4 mb-6">
          {messages.length === 0 ? (
            <Card className="p-6 text-center border-accent/30">
              <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Como posso ajudar?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Conte sua situação jurídica e receba orientações sobre seus direitos
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
                {[
                  "Meu vizinho faz muito barulho à noite",
                  "Comprei um produto com defeito",
                  "Fui demitido sem justa causa",
                  "Tive um acidente de trânsito"
                ].map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(example)}
                    className="p-3 text-sm border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </Card>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`animate-fade-in ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-[85%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'} rounded-2xl p-4 shadow-md`}>
                  {message.isStreaming ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                      <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1">|</span>
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                  
                  {message.role === 'assistant' && !message.isStreaming && index === messages.length - 1 && (
                    <div className="mt-4 pt-4 border-t border-border space-y-2">
                      {/* Botão Criar Aula Completa */}
                      <Button
                        onClick={handleCreateLesson}
                        disabled={isCreatingLesson}
                        className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90"
                      >
                        {isCreatingLesson ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Criando aula...
                          </>
                        ) : (
                          <>
                            <GraduationCap className="w-4 h-4 mr-2" />
                            Criar Aula Completa
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Perguntas sugeridas:</p>
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-sm p-2 rounded-lg hover:bg-accent/10 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-50">
          <div className="container max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Descreva sua situação jurídica..."
                className="flex-1 min-h-[60px] max-h-[120px] resize-none"
                disabled={isLoading || isCreatingLesson}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !isLoading && !isCreatingLesson) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button type="submit" size="icon" disabled={isLoading || isCreatingLesson || !input.trim()} className="flex-shrink-0">
                {isLoading || isCreatingLesson ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessoraJuridica;
