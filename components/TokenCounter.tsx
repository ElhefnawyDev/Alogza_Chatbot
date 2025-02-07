"use client";

import { memo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenCounterProps {
  tokens: number;
  className?: string;
}

// This would come from your API or state management

function PureTokenCounter({ tokens, className }: TokenCounterProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors",
            className
          )}
        >
          <Coins className="h-4 w-4" />
          <span className="tabular-nums">{tokens.toLocaleString()}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Remaining tokens for this model</p>
      </TooltipContent>
    </Tooltip>
  );
}

export const TokenCounter = memo(PureTokenCounter);
