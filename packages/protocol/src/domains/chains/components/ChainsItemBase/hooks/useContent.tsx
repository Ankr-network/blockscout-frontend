import { ChainID } from 'modules/chains/types';
import { useMemo } from 'react';

import { Content, ContentProps } from '../components/Content';
import { isSuiChain } from '../components/Label/utils/isSuiChain';

export interface ContentParams extends Omit<ContentProps, 'isSui'> {
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
  logoSrc,
  name,
  period,
  timeframe,
  totalRequests,
}: ContentParams) => {
  const isSui = useMemo(() => isSuiChain(chainId), [chainId]);

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
      />
    ),
    [
      chainsItemButton,
      chainsItemLink,
      description,
      hasPremiumDialog,
      isArchive,
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
