import { WhitelistItem } from 'multirpc-sdk';
import { useMemo } from 'react';

import { AddToWhitelistFormData } from 'domains/projects/store';
import { ChainID } from 'modules/chains/types';
import { canAddItemsToWhitelist } from 'domains/projects/utils/canAddItemsToWhitelist';
import { isEVMBased } from 'modules/chains/utils/isEVMBased';

import { useProjectFormValues } from '../../hooks/useProjectFormValues';

export const useWhitelistData = () => {
  const { allSelectedChainIds, whitelistItems } = useProjectFormValues();

  const hasEvmChain =
    allSelectedChainIds.filter(chainId => isEVMBased(chainId as ChainID))
      .length > 0;

  const whitelist = useMemo(
    () =>
      whitelistItems.flatMap(({ chains, type, value }) => {
        return chains.map<WhitelistItem>(blockchain => ({
          blockchain,
          list: [value],
          type,
        }));
      }),
    [whitelistItems],
  );

  const {
    isAddingDomainAllowed,
    isAddingIPAllowed,
    isAddingSmartContractAllowed,
  } = useMemo(
    () => canAddItemsToWhitelist({ hasEvmChain, whitelist }),
    [hasEvmChain, whitelist],
  );

  return {
    isAddingIPAllowed,
    isAddingDomainAllowed,
    isAddingSmartContractAllowed,
    data: whitelistItems as AddToWhitelistFormData[],
  };
};
