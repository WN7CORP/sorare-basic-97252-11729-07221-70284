import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Sparkles, FileText, Calendar, Monitor, Headphones, Gavel, Gamepad2, FileSearch } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { useFeaturedContent } from "@/hooks/useFeaturedContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Aprender = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { featuredItems, loading } = useFeaturedContent();
  const [activeTab, setActiveTab] = useState("cursos");
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const cursosItems = featuredItems.filter(item => item.type === 'curso');
  const videoaulasItems = featuredItems.filter(item => item.type === 'videoaula');

  // Auto-alternância entre tabs
  useEffect(() => {
    if (!isAutoSwitching) return;

    const switchInterval = 5000; // 5 segundos
    const progressInterval = 50; // Atualizar a cada 50ms
    
    let currentProgress = 0;
    const progressTimer = setInterval(() => {
      currentProgress += (progressInterval / switchInterval) * 100;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        currentProgress = 0;
        setActiveTab(prev => prev === "cursos" ? "videoaulas" : "cursos");
      }
    }, progressInterval);

    return () => {
      clearInterval(progressTimer);
    };
  }, [isAutoSwitching]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsAutoSwitching(false);
    setProgress(0);
    
    // Reativar auto-switch após 10 segundos de inatividade
    setTimeout(() => setIsAutoSwitching(true), 10000);
  };

  const opcoesComplementares = [
    {
      id: "professora",
      titulo: "Professora Jurídica",
      descricao: "Tire dúvidas e aprenda com IA especializada em direito",
      icon: GraduationCap,
      path: "/chat-professora",
      iconBg: "bg-violet-600 shadow-lg shadow-violet-500/50",
      glowColor: "rgb(124, 58, 237)",
    },
    {
      id: "resumos",
      titulo: "Resumos Jurídicos",
      descricao: "Crie resumos estruturados de textos e documentos",
      icon: FileSearch,
      path: "/resumos-juridicos",
      iconBg: "bg-orange-600 shadow-lg shadow-orange-500/50",
      glowColor: "rgb(234, 88, 12)",
    },
    {
      id: "flashcards",
      titulo: "Flashcards",
      descricao: "Estude com flashcards interativos por área e tema",
      icon: Sparkles,
      path: "/flashcards",
      iconBg: "bg-blue-600 shadow-lg shadow-blue-500/50",
      glowColor: "rgb(37, 99, 235)",
    },
    {
      id: "plano",
      titulo: "Plano de Estudos",
      descricao: "Organize seu cronograma de estudos personalizado",
      icon: Calendar,
      path: "/plano-estudos",
      iconBg: "bg-indigo-600 shadow-lg shadow-indigo-500/50",
      glowColor: "rgb(79, 70, 229)",
    },
    {
      id: "audioaulas",
      titulo: "Audioaulas",
      descricao: "Aprenda ouvindo em qualquer lugar",
      icon: Headphones,
      path: "/audioaulas",
      iconBg: "bg-purple-600 shadow-lg shadow-purple-500/50",
      glowColor: "rgb(147, 51, 234)",
    },
    {
      id: "acesso-desktop",
      titulo: "Acesso Desktop",
      descricao: "Solicite acesso à plataforma completa para desktop",
      icon: Monitor,
      path: "/acesso-desktop",
      iconBg: "bg-cyan-600 shadow-lg shadow-cyan-500/50",
      glowColor: "rgb(8, 145, 178)",
      mobileOnly: true,
    },
  ];

  const assistentesEspecializados = [
    {
      id: "psicologa",
      titulo: "Psicóloga",
      descricao: "Suporte emocional e bem-estar para estudantes",
      icon: Sparkles,
      path: "/chat-professora?mode=psychologist",
      iconBg: "bg-purple-600 shadow-lg shadow-purple-500/50",
      glowColor: "rgb(147, 51, 234)",
    },
    {
      id: "refutacao",
      titulo: "Refutação",
      descricao: "Análise crítica e contra-argumentos jurídicos",
      icon: Gavel,
      path: "/chat-professora?mode=refutacao",
      iconBg: "bg-red-600 shadow-lg shadow-red-500/50",
      glowColor: "rgb(220, 38, 38)",
    },
  ];

  const jogosEducativos = [
    {
      id: "jogos-juridicos",
      titulo: "Jogos Jurídicos",
      descricao: "Aprenda brincando: forca, cruzadas, caça-palavras e stop",
      icon: Gamepad2,
      path: "/jogos-juridicos",
      iconBg: "bg-pink-600 shadow-lg shadow-pink-500/50",
      glowColor: "rgb(219, 39, 119)",
    },
    {
      id: "simulacao-juridica",
      titulo: "Jogo de Simulação",
      descricao: "Pratique argumentação em audiências virtuais interativas",
      icon: Gavel,
      path: "/simulacao-juridica",
      iconBg: "bg-amber-600 shadow-lg shadow-amber-500/50",
      glowColor: "rgb(217, 119, 6)",
    },
  ];

  return (
    <div className="px-3 py-4 max-w-6xl mx-auto">
      {/* Seção de Destaques */}
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Aprender</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Comece por aqui: cursos e videoaulas em destaque
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="w-full aspect-[16/9] rounded-xl" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="cursos">Cursos</TabsTrigger>
                <TabsTrigger value="videoaulas">Videoaulas</TabsTrigger>
              </TabsList>
              
              {/* Progress bar para indicar auto-switch */}
              {isAutoSwitching && (
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>

            <TabsContent 
              value="cursos" 
              className="transition-all duration-700 ease-in-out data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:fade-in-0"
            >
              <FeaturedCarousel items={cursosItems.length > 0 ? cursosItems : featuredItems.filter(i => i.type === 'curso')} />
            </TabsContent>

            <TabsContent 
              value="videoaulas"
              className="transition-all duration-700 ease-in-out data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:fade-in-0"
            >
              <FeaturedCarousel items={videoaulasItems.length > 0 ? videoaulasItems : featuredItems.filter(i => i.type === 'videoaula')} />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Seção Complementos em Alta */}
      <div className="mt-12">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Complementos em Alta</h2>
          <p className="text-sm text-muted-foreground">
            Ferramentas e recursos para aprimorar seus estudos
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {opcoesComplementares
            .filter((opcao) => !opcao.mobileOnly || isMobile)
            .map((opcao) => {
              const Icon = opcao.icon;
              return (
                <Card
                  key={opcao.id}
                  className="cursor-pointer hover:scale-105 hover:shadow-2xl hover:-translate-y-1 transition-all border-2 border-transparent hover:border-accent/50 bg-gradient-to-br from-card to-card/80 group shadow-xl overflow-hidden relative"
                  onClick={() => navigate(opcao.path)}
                >
                  {/* Brilho colorido no topo */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 opacity-80"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${opcao.glowColor}, transparent)`,
                      boxShadow: `0 0 20px ${opcao.glowColor}`
                    }}
                  />
                  
                  <CardContent className="p-5 flex flex-col items-center text-center min-h-[180px] justify-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${opcao.iconBg} transition-transform group-hover:scale-110 mb-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-base mb-2 text-foreground">{opcao.titulo}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{opcao.descricao}</p>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>

      {/* Seção Assistentes Especializados */}
      <div className="mt-12">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Assistentes Especializados</h2>
          <p className="text-sm text-muted-foreground">
            Assistentes focados em necessidades específicas
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {assistentesEspecializados.map((assistente) => {
            const Icon = assistente.icon;
            return (
              <Card
                key={assistente.id}
                className="cursor-pointer hover:scale-105 hover:shadow-2xl hover:-translate-y-1 transition-all border-2 border-transparent hover:border-accent/50 bg-gradient-to-br from-card to-card/80 group shadow-xl overflow-hidden relative"
                onClick={() => navigate(assistente.path)}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-1 opacity-80"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${assistente.glowColor}, transparent)`,
                    boxShadow: `0 0 20px ${assistente.glowColor}`
                  }}
                />
                
                <CardContent className="p-5 flex flex-col items-center text-center min-h-[180px] justify-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${assistente.iconBg} transition-transform group-hover:scale-110 mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-2 text-foreground">{assistente.titulo}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{assistente.descricao}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Seção Jogos Educativos */}
      <div className="mt-12 pb-20">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Jogos Educativos</h2>
          <p className="text-sm text-muted-foreground">
            Aprenda sobre direito jogando
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {jogosEducativos.map((jogo) => {
            const Icon = jogo.icon;
            return (
              <Card
                key={jogo.id}
                className="cursor-not-allowed opacity-60 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 transition-all border-2 border-transparent bg-gradient-to-br from-card to-card/80 group shadow-xl overflow-hidden relative"
              >
                {/* Overlay "Em Breve" */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                  <div className="text-center space-y-2">
                    <p className="text-lg font-bold text-accent">Em Breve</p>
                    <p className="text-xs text-muted-foreground px-4">Estamos preparando algo incrível</p>
                  </div>
                </div>

                {/* Brilho colorido no topo */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 opacity-80"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${jogo.glowColor}, transparent)`,
                    boxShadow: `0 0 20px ${jogo.glowColor}`
                  }}
                />
                
                <CardContent className="p-5 flex flex-col items-center text-center min-h-[180px] justify-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${jogo.iconBg} transition-transform group-hover:scale-110 mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-2 text-foreground">{jogo.titulo}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{jogo.descricao}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Aprender;
