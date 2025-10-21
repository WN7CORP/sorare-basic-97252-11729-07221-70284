import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChevronLeft, ChevronRight, Clock, Flag, Loader2, CheckCircle2, XCircle, Zap, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommentModal } from "@/components/CommentModal";

interface Questao {
  id: number;
  area: string;
  enunciado: string;
  alternativaA: string;
  alternativaB: string;
  alternativaC: string;
  alternativaD: string;
  resposta: string;
  comentario: string;
  numeroQuestao: number;
}

const SimuladosRealizar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const exame = searchParams.get("exame");
  const ano = searchParams.get("ano");
  const areas = searchParams.get("areas")?.split(",");
  const quantidade = parseInt(searchParams.get("quantidade") || "20");

  const [showModoDialog, setShowModoDialog] = useState(true);
  const [modoResposta, setModoResposta] = useState<"imediato" | "final" | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [respostas, setRespostas] = useState<{ [key: number]: string }>({});
  const [marcadas, setMarcadas] = useState<Set<number>>(new Set());
  const [showFinalizarDialog, setShowFinalizarDialog] = useState(false);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [respostasConfirmadas, setRespostasConfirmadas] = useState<{ [key: number]: boolean }>({});
  const [mostrarComentario, setMostrarComentario] = useState<{ [key: number]: boolean }>({});
  const [animarErro, setAnimarErro] = useState(false);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTempoDecorrido((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to top quando mudar de questão
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const { data: questoes, isLoading } = useQuery({
    queryKey: ["simulado-questoes", exame, ano, areas, quantidade],
    queryFn: async () => {
      let query = supabase.from("SIMULADO-OAB" as any).select("*");

      if (exame && ano) {
        query = query.eq("Exame", exame).eq("Ano", parseInt(ano));
      } else if (areas && areas.length > 0) {
        query = query.in("area", areas).limit(quantidade);
      }

      const { data, error } = await query as any;
      if (error) throw error;

      return data
        .map((q) => ({
          id: q.id,
          area: q.area || "N/A",
          enunciado: q["Enunciado"] || "",
          alternativaA: q["Alternativa A"] || "",
          alternativaB: q["Alternativa B"] || "",
          alternativaC: q["Alternativa C"] || "",
          alternativaD: q["Alternativa D"] || "",
          resposta: q.resposta || "",
          comentario: q.comentario || "",
          numeroQuestao: q["Número da questão"] || 0,
        }))
        .filter((q) => q.enunciado && q.alternativaA);
    },
  });

  const handleResposta = (alternativa: string) => {
    if (!questoes) return;
    setRespostas({ ...respostas, [currentIndex]: alternativa });
  };

  const confirmarResposta = () => {
    if (!questoes) return;
    
    const questaoAtual = questoes[currentIndex];
    const respostaUsuario = respostas[currentIndex];
    const acertou = respostaUsuario === questaoAtual.resposta;
    
    // Tocar som
    const audio = new Audio(acertou ? '/sounds/correct.mp3' : '/sounds/error.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.log('Erro ao tocar som:', err));
    
    // Animar erro
    if (!acertou) {
      setAnimarErro(true);
      setTimeout(() => setAnimarErro(false), 400);
    }
    
    setRespostasConfirmadas({ ...respostasConfirmadas, [currentIndex]: true });
  };

  const toggleComentario = () => {
    setMostrarComentario({ 
      ...mostrarComentario, 
      [currentIndex]: !mostrarComentario[currentIndex] 
    });
  };

  const handleMarcar = () => {
    const newMarcadas = new Set(marcadas);
    if (marcadas.has(currentIndex)) {
      newMarcadas.delete(currentIndex);
    } else {
      newMarcadas.add(currentIndex);
    }
    setMarcadas(newMarcadas);
  };

  const handleFinalizar = () => {
    if (!questoes) return;

    const resultado = {
      questoes,
      respostas,
      tempoDecorrido,
      exame,
      ano,
      areas,
    };

    navigate("/simulados/resultado", { state: resultado });
  };

  if (isLoading || !modoResposta) {
    return (
      <>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
            <p className="text-muted-foreground">Carregando questões...</p>
          </div>
        ) : (
          <AlertDialog open={showModoDialog} onOpenChange={setShowModoDialog}>
            <AlertDialogContent className="max-w-[90vw] w-full sm:max-w-lg p-4 sm:p-6">
              <AlertDialogHeader className="space-y-2 text-center">
                <AlertDialogTitle className="text-xl sm:text-2xl font-bold">
                  Como deseja realizar
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm sm:text-base">
                  Escolha como deseja visualizar as respostas
                </AlertDialogDescription>
              </AlertDialogHeader>
              
              <div className="grid gap-4 py-4">
                {/* Feedback Imediato */}
                <button
                  onClick={() => {
                    setModoResposta("imediato");
                    setShowModoDialog(false);
                  }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-border hover:border-accent transition-all p-5 sm:p-6 text-left bg-card hover:bg-accent/5"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="white" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-base sm:text-lg">Feedback Imediato</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Veja se acertou ou errou logo após responder cada questão
                      </p>
                    </div>
                  </div>
                </button>

                {/* Resultado no Final */}
                <button
                  onClick={() => {
                    setModoResposta("final");
                    setShowModoDialog(false);
                  }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-border hover:border-accent transition-all p-5 sm:p-6 text-left bg-card hover:bg-accent/5"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                      <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-base sm:text-lg">Resultado no Final</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Responda todas as questões e veja o resultado completo ao finalizar
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 mt-2">
                <AlertDialogCancel 
                  onClick={() => navigate(-1)} 
                  className="w-full sm:w-auto mt-0"
                >
                  Voltar
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </>
    );
  }

  if (!questoes || questoes.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground mb-4">
          Nenhuma questão encontrada para este simulado.
        </p>
        <Button onClick={() => navigate("/simulados")}>Voltar</Button>
      </div>
    );
  }

  const questaoAtual = questoes[currentIndex];
  const progresso = ((currentIndex + 1) / questoes.length) * 100;
  const alternativas = [
    { letra: "A", texto: questaoAtual.alternativaA },
    { letra: "B", texto: questaoAtual.alternativaB },
    { letra: "C", texto: questaoAtual.alternativaC },
    { letra: "D", texto: questaoAtual.alternativaD },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Fixo */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-3 py-4">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono">{formatTime(tempoDecorrido)}</span>
            </div>
            <div className="text-sm font-medium">
              Questão {currentIndex + 1} de {questoes.length}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFinalizarDialog(true)}
            >
              Finalizar
            </Button>
          </div>
          <Progress value={progresso} className="h-2" />
        </div>
      </div>

      {/* Questão */}
      <div className="px-3 py-6 max-w-4xl mx-auto w-full">
        <Card className={cn("p-4 md:p-6 mb-6", animarErro && "animate-shake")}>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">
              {questaoAtual.area}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarcar}
              className={cn(
                "ml-auto",
                marcadas.has(currentIndex) && "text-accent"
              )}
            >
              <Flag
                className={cn(
                  "w-4 h-4",
                  marcadas.has(currentIndex) && "fill-current"
                )}
              />
            </Button>
          </div>

          <p className="text-sm md:text-base leading-relaxed mb-6 font-medium break-words">
            {questaoAtual.enunciado}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {alternativas.map((alt) => {
              const isSelected = respostas[currentIndex] === alt.letra;
              const isCorrect = alt.letra === questaoAtual.resposta;
              const isConfirmed = respostasConfirmadas[currentIndex];
              const respostaErrada = isConfirmed && respostas[currentIndex] !== questaoAtual.resposta;
              const showFeedback = modoResposta === "imediato" && isConfirmed && isSelected;
              const showCorrectAnswer = modoResposta === "imediato" && isConfirmed && respostaErrada && isCorrect;
              
              return (
                <button
                  key={alt.letra}
                  onClick={() => handleResposta(alt.letra)}
                  disabled={modoResposta === "imediato" && isConfirmed}
                  className={cn(
                    "w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all",
                    "hover:border-accent hover:bg-accent/5 disabled:cursor-not-allowed",
                    isSelected && !showFeedback && "border-accent bg-accent/10",
                    showFeedback && isCorrect && "border-green-500 bg-green-500/10",
                    showFeedback && !isCorrect && "border-destructive bg-destructive/10",
                    showCorrectAnswer && "border-green-500 bg-green-500/10"
                  )}
                >
                  <div className="flex items-start gap-2 md:gap-3">
                    <span className="font-bold text-muted-foreground shrink-0 flex items-center gap-2">
                      {alt.letra}.
                      {showFeedback && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                      {showFeedback && !isCorrect && (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                      {showCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </span>
                    <span className={cn("text-sm md:text-base break-words", isSelected && "font-medium")}>
                      {alt.texto}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Botão Responder - Modo Imediato */}
          {modoResposta === "imediato" && respostas[currentIndex] && !respostasConfirmadas[currentIndex] && (
            <div className="mt-4">
              <Button 
                onClick={confirmarResposta}
                className="w-full"
              >
                Responder
              </Button>
            </div>
          )}

          {/* Feedback e Botão Ver Comentário - Modo Imediato */}
          {modoResposta === "imediato" && respostasConfirmadas[currentIndex] && (
            <>
              <div className="mt-4 p-3 md:p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-semibold mb-2 text-sm md:text-base flex items-center gap-2">
                  {respostas[currentIndex] === questaoAtual.resposta ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-green-500">Resposta Correta!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-destructive" />
                      <span className="text-destructive">
                        Resposta Incorreta. Correta: {questaoAtual.resposta}
                      </span>
                    </>
                  )}
                </h4>
              </div>

              {questaoAtual.comentario && (
                <div className="mt-3">
                  <Button 
                    onClick={() => setMostrarComentario({ ...mostrarComentario, [currentIndex]: true })}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <span className="mr-2">💬</span>
                    Ver Comentário
                  </Button>
                  
                  <CommentModal 
                    isOpen={mostrarComentario[currentIndex] || false}
                    onClose={() => setMostrarComentario({ ...mostrarComentario, [currentIndex]: false })}
                    comment={questaoAtual.comentario}
                  />
                </div>
              )}
            </>
          )}
        </Card>

        {/* Navegação */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          <Button
            onClick={() =>
              setCurrentIndex((prev) => Math.min(questoes.length - 1, prev + 1))
            }
            disabled={currentIndex === questoes.length - 1}
            className="flex-1"
          >
            Próxima
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Dialog de Finalização */}
      <AlertDialog open={showFinalizarDialog} onOpenChange={setShowFinalizarDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Finalizar Simulado?</AlertDialogTitle>
            <AlertDialogDescription>
              Você respondeu {Object.keys(respostas).length} de {questoes.length}{" "}
              questões. Deseja finalizar e ver o resultado?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinalizar}>
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SimuladosRealizar;
