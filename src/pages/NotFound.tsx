import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-lg glass-panel shadow-[0_0_40px_-15px_rgba(159,37,61,0.35)]">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-nova-500/20 rounded-full animate-pulse-glow" />
              <AlertCircle className="relative h-16 w-16 text-nova-500" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>

          <h2 className="text-xl font-semibold text-foreground/90 mb-4">
            Lost in the void
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed font-narrative">
            This page has drifted past the event horizon. It may have been moved, renamed, or never
            existed in this universe.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-auric-300 text-nebula-900 hover:opacity-90 px-6 py-2.5"
            >
              <Home className="w-4 h-4 mr-2 inline" />
              Back to safety
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
