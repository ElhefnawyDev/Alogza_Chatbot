"use client";

import { memo, useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { models } from "@/lib/ai/models";

interface TokenDeductionRateProps {
  selectedApiIdentifier: string; // Receive the selected model's API identifier
  className?: string;
}

function PureTokenDeductionRate({ selectedApiIdentifier, className }: TokenDeductionRateProps) {
  // Find the model by API identifier and get its rate
  const selectedModel = useMemo(() => 
    models.find((model) => model.apiIdentifier === selectedApiIdentifier),
    [selectedApiIdentifier]
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors",
            className
          )}
        >
          <Zap className="h-4 w-4" />
          <span className="tabular-nums">{selectedModel?.rate || "N/A"}/msg</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Token deduction rate per message for {selectedModel?.label || "Unknown Model"}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export const TokenDeductionRate = memo(PureTokenDeductionRate);
