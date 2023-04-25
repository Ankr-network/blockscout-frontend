import { ChainID } from 'domains/chains/types';
import { useMemo } from 'react';

import { Content, ContentProps } from '../components/Content';
import { isSuiChain } from '../components/Label/utils/isSuiChain';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';

export interface ContentParams extends Omit<ContentProps, 'isSui' | 'logoSrc'> {
  chainId: ChainID;
}

export const useContent = ({
  chainId,
  chainsItemButton,
  chainsItemLink,
  description,
  hasPremiumDialog,
  isArchive,
  isHighlighted,
  isLoading,
  name,
  period,
  timeframe,
  totalRequests,
  isComingSoon,
}: ContentParams) => {
  const isSui = useMemo(() => isSuiChain(chainId), [chainId]);
  const logoSrc = useChainIcon(chainId);

  return useMemo(
    () => (
      <Content
        chainsItemButton={chainsItemButton}
        chainsItemLink={chainsItemLink}
        description={description}
        hasPremiumDialog={hasPremiumDialog}
        isArchive={isArchive}
        isHighlighted={isHighlighted}
        isLoading={isLoading}
        isSui={isSui}
        logoSrc={logoSrc}
        name={name}
        period={period}
        timeframe={timeframe}
        totalRequests={totalRequests}
        isComingSoon={isComingSoon}
      />
    ),
    [
      chainsItemButton,
      chainsItemLink,
      description,
      hasPremiumDialog,
      isArchive,
      isComingSoon,
      isHighlighted,
      isLoading,
      isSui,
      logoSrc,
      name,
      period,
      timeframe,
      totalRequests,
    ],
  );
};
