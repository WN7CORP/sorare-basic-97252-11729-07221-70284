import { useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DotLottiePlayer } from "@dotlottie/react-player";

interface AvaliarAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AvaliarAppModal = ({ open, onOpenChange }: AvaliarAppModalProps) => {
  const handleAvaliar = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=br.com.app.gpu2994564.gpub492f9e6db037057aaa93d7adfa9e3e0",
      "_blank"
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Avalie nosso App! ⭐
          </DialogTitle>
          <DialogDescription className="text-center">
            Sua opinião é muito importante para nós
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          <div className="w-48 h-48">
            <DotLottiePlayer
              src="/Cat playing animation.lottie"
              loop
              autoplay
            />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Se você está gostando do app, que tal deixar uma avaliação na Play Store?
            Isso nos ajuda muito a continuar melhorando!
          </p>

          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Mais tarde
            </Button>
            <Button onClick={handleAvaliar} className="flex-1">
              <Star className="w-4 h-4 mr-2" />
              Avaliar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
