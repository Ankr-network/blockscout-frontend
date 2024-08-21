import { useCallback, useMemo, useState } from 'react';

import { MOBILE_HEADER_HEIGHT } from 'modules/layout/components/MobileHeader';
import { Chain, Timeframe } from 'modules/chains/types';

import { useChainRequests } from './useChainRequests';

export interface IAccordionItemProps {
  chain: Chain;
  currentTab?: any;
  isActive?: boolean;
  timeframe: Timeframe;
  userEndpointToken?: string;
}

export const ANIMATION_DURATION = 500;

export const useAccordionItem = ({
  chain,
  currentTab,
  isActive,
  timeframe,
  userEndpointToken,
}: IAccordionItemProps) => {
  const { requestsString } = useChainRequests(
    chain.id,
    timeframe,
    userEndpointToken,
  );

  const [isClosedManually, setIsClosedManually] = useState(false);

  const elementId = useMemo(() => `chain-${chain.id}`, [chain.id]);

  const handleScrollToChain = useCallback(() => {
    const element = document.getElementById(elementId);
    const headerHeight = MOBILE_HEADER_HEIGHT;

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const elementTopPosition = elementRect.top + window.pageYOffset;
      const offsetPosition = elementTopPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, [elementId]);

  const handleSelect = useCallback(() => {
    if (!isActive) {
      currentTab?.onSelect();

      setTimeout(handleScrollToChain, ANIMATION_DURATION);
    }

    if (isClosedManually) {
      setIsClosedManually(false);

      return;
    }

    if (isActive) {
      setIsClosedManually(true);
    }
  }, [currentTab, handleScrollToChain, isActive, isClosedManually]);

  return {
    requestsString,
    isClosedManually,
    elementId,
    handleScrollToChain,
    handleSelect,
  };
};
