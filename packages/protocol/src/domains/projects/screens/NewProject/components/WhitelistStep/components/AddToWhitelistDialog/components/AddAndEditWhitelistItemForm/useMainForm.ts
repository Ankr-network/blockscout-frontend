import { UserEndpointTokenMode } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { getChainName as getFallbackChainsName } from 'uiKit/utils/metatags';
import { getChainName } from 'domains/projects/utils/getChainName';
import { isEVMBased } from 'modules/chains/utils/isEVMBased';
import { selectBlockchains } from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';

import { AddToWhitelistFormFields } from './AddToWhitelistFormUtils';

export const useMainForm = (shouldSkipFormReset?: boolean) => {
  const {
    allSelectedChainIds: chainIds,
    isValid,
    onChange,
    whitelistDialog,
    whitelistItems,
  } = useProjectFormValues();

  const { data: chainsData } = useAppSelector(selectBlockchains);

  const selectedType = whitelistDialog?.type;

  const isTypeSelected = Boolean(selectedType);
  const isSmartContractAddressSelected =
    selectedType === UserEndpointTokenMode.ADDRESS;
  const isValueFilled = Boolean(whitelistDialog?.value);
  const isAtLeastOneChainSelected = Number(whitelistDialog?.chains?.length) > 0;

  const isFormFilled =
    isTypeSelected && isAtLeastOneChainSelected && isValueFilled;

  const preparedChains = useMemo(
    () =>
      chainIds.map(chainId => {
        const currentChain = chainsData?.find(chain => chain.id === chainId);

        return {
          id: chainId,
          disabled: isSmartContractAddressSelected
            ? !isEVMBased(chainId)
            : false,
          name: currentChain
            ? getChainName(currentChain)
            : getFallbackChainsName(chainId),
        };
      }),
    [chainsData, isSmartContractAddressSelected, chainIds],
  );

  const handleOnChange = useCallback(() => {
    if (shouldSkipFormReset) return;

    if (whitelistDialog?.chains) {
      // @ts-ignore whitelistDialog.chains was moved to enum instead of string
      onChange(AddToWhitelistFormFields.chains, undefined);
    }

    if (whitelistDialog?.value) {
      // @ts-ignore whitelistDialog.value was moved to enum instead of string
      onChange(AddToWhitelistFormFields.value, undefined);
    }
  }, [
    onChange,
    whitelistDialog?.chains,
    whitelistDialog?.value,
    shouldSkipFormReset,
  ]);

  return {
    handleOnChange,
    isTypeSelected,
    selectedType,
    isValid,
    preparedChains,
    isSmartContractAddressSelected,
    isAtLeastOneChainSelected,
    isFormFilled,
    whitelistDialog,
    whitelistItems,
  };
};
