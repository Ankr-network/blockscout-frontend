import { useCallback, useMemo } from 'react';

import { AddToWhitelistFormData } from 'domains/projects/store';
import {
  MAX_AMOUNT_OF_IPS,
  MAX_AMOUNT_OF_DOMAINS,
  MAX_AMOUNT_OF_SMART_CONTRACT_ADDRESSES,
} from 'domains/projects/const';
import { isEVMBased } from 'domains/chains/utils/isEVMBased';
import { WhiteListItem } from 'domains/projects/types';
import { ChainID } from 'domains/chains/types';
import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';

export const useWhitelistData = () => {
  const { allSelectedChainIds, whitelistItems } = useProjectFormValues();

  const checkIsAddingAllowed = useCallback(
    (fieldName: string, maxAmount: number) =>
      (whitelistItems as AddToWhitelistFormData[]).filter(
        x => x.type === fieldName,
      ).length < maxAmount,
    [whitelistItems],
  );

  const hasEvmChain =
    allSelectedChainIds.filter(chainId => isEVMBased(chainId as ChainID))
      .length > 0;

  const isAddingIPAllowed = useMemo(
    () => checkIsAddingAllowed(WhiteListItem.ip, MAX_AMOUNT_OF_IPS),
    [checkIsAddingAllowed],
  );
  const isAddingDomainAllowed = useMemo(
    () => checkIsAddingAllowed(WhiteListItem.referer, MAX_AMOUNT_OF_DOMAINS),
    [checkIsAddingAllowed],
  );
  const isAddingSmartContractAllowed = useMemo(
    () =>
      checkIsAddingAllowed(
        WhiteListItem.address,
        MAX_AMOUNT_OF_SMART_CONTRACT_ADDRESSES,
      ) && hasEvmChain,
    [checkIsAddingAllowed, hasEvmChain],
  );

  return {
    isAddingIPAllowed,
    isAddingDomainAllowed,
    isAddingSmartContractAllowed,
    data: whitelistItems as AddToWhitelistFormData[],
  };
};
