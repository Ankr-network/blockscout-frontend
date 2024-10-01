import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { ChainID } from '@ankr.com/chains-list';

export const useChainCellWithSubchains = ({
  chainId,
  isChecked,
  onClick,
  setExpandedId,
}: {
  isChecked: boolean;
  onClick: (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
  setExpandedId: Dispatch<SetStateAction<ChainID | undefined>>;
  chainId: ChainID;
}) => {
  const handleToggleAccordion = useCallback(() => {
    setExpandedId(expandedId => (expandedId === chainId ? undefined : chainId));
  }, [chainId, setExpandedId]);

  const handleChainClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      onClick(event);
      if (!isChecked) {
        setExpandedId(chainId);
      }
    },
    [chainId, isChecked, onClick, setExpandedId],
  );

  return {
    onToggleAccordion: handleToggleAccordion,
    onChainClick: handleChainClick,
  };
};
