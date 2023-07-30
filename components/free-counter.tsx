import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FREE_GENERATIONS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface FreeCounterProps {
  generationCount: number;
}

const FreeCounter = ({ generationCount = 0 }: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {generationCount} / {FREE_GENERATIONS} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(generationCount / FREE_GENERATIONS) * 100}
            />
          </div>
          <Button variant="premium" className="w-full">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
