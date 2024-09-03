import { useMemo } from 'react';

import { Chain, ChainID } from 'modules/chains/types';
import { useAppSelector } from 'store/useAppSelector';
import { selectSubChainIdsByChainId } from 'modules/chains/store/selectors';
import { isEVMBased } from 'modules/chains/utils/isEVMBased';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useCodeExampleStatus = (
  chain: Chain,
  onOpenCodeExample?: () => void,
) => {
  const { hasPremium } = useAuth();
  const { id, premiumOnly } = chain;

  const allSubChainIds = useAppSelector(state =>
    selectSubChainIdsByChainId(state, id),
  );

  const hasEvmCompatibleSubChains = useMemo(() => {
    if (id === ChainID.MULTICHAIN) {
      return true;
    }

    return allSubChainIds.some(isEVMBased);
  }, [allSubChainIds, id]);

  const isCodeExampleDisabled =
    !hasEvmCompatibleSubChains ||
    typeof onOpenCodeExample === 'undefined' ||
    (premiumOnly && !hasPremium);

  return {
    hasEvmCompatibleSubChains,
    isCodeExampleDisabled,
  };
};
