import { useMemo } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import { useChainIcon } from 'uiKit/hooks/useChainIcon';

import { Content, ContentProps } from '../components/Content';
import { isSuiChain } from '../components/Label/utils/isSuiChain';

export interface ContentParams extends Omit<ContentProps, 'isSui' | 'logoSrc'> {
  chainId: ChainID;
}

export const useContent = ({
  chainId,
  chainsItemButton,
  chainsItemLink,
  description,
  hasPremiumDialog,
  hasTotalRequestsLabel,
  isArchive,
  isComingSoon,
  isHighlighted,
  isLoading,
  name,
  period,
  timeframe,
  totalRequests,
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
        hasTotalRequestsLabel={hasTotalRequestsLabel}
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
      hasTotalRequestsLabel,
    ],
  );
};
