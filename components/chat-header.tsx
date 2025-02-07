'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';

import { ModelSelector } from '@/components/model-selector';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { PlusIcon } from './icons';
import { useSidebar } from './ui/sidebar';
import { memo, useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { VisibilityType, VisibilitySelector } from './visibility-selector';
import { TokenCounter } from './TokenCounter';
import { TokenDeductionRate } from './TokenDeductionRate';
import { models } from '@/lib/ai/models';

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const router = useRouter();
  const { open } = useSidebar();
  const { width: windowWidth } = useWindowSize();
  const modelsData = [
    { modelId: "gpt-4", rate: 10 },
    { modelId: "gpt-3.5", rate: 10 },
    { modelId: "custom-ai", rate: 5 },
  ];

  // Token state
  const [tokens, setTokens] = useState<number>(0);
  const selectedModel = models.find((model) => model.id === selectedModelId);

  // Fetch tokens function
  const fetchTokens = async () => {
    try {
      const response = await fetch('/api/tokens'); // API to get token count
      const data = await response.json();
      if (data.tokens !== undefined) {
        setTokens(data.tokens);
      }
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  // Fetch tokens on mount and every 10 seconds
  useEffect(() => {
    fetchTokens();
    const interval = setInterval(fetchTokens, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />

      {(!open || windowWidth < 768) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
              onClick={() => {
                router.push('/');
                router.refresh();
              }}
            >
              <PlusIcon />
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      )}

      {!isReadonly && (
        <ModelSelector
          selectedModelId={selectedModelId}
          className="order-1 md:order-2"
        />
      )}

      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          selectedVisibilityType={selectedVisibilityType}
          className="order-1 md:order-3"
        />
      )}

      {/* Token Counter */}
      {/* Token information on the right side */}
      {!isReadonly && (
        <div className="flex items-center gap-2 ml-auto order-last">
          <TokenCounter tokens={tokens} className="hidden md:flex" />
          <TokenDeductionRate selectedApiIdentifier={selectedModel?.apiIdentifier || ""} />
          {/* For mobile, we'll only show one of them to save space */}
          <TokenCounter tokens={tokens} className="md:hidden" />
        </div>
      )}

    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});
