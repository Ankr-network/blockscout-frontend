import { useCallback, useMemo } from 'react';
import { BlockchainType, IBlockchainEntity } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { selectBlockchains } from 'domains/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { isEVMBased } from 'domains/chains/utils/isEVMBased';
import { getChainName } from 'uiKit/utils/metatags';
import { getCustomLabelForChainsCornerCases } from 'domains/projects/utils/getCustomLabelForChainsCornerCases';
import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';
import { WhiteListItem } from 'domains/projects/types';
import { ChainID } from 'domains/chains/types';

import { AddToWhitelistFormFields } from './AddToWhitelistFormUtils';

const getChainLabel = (fallBackName: string, chain?: IBlockchainEntity) => {
  if (chain?.name) {
    if (
      chain?.type === BlockchainType.Mainnet &&
      chain?.id !== ChainID.SCROLL
    ) {
      return t('projects.new-project.step-2.mainnet-postfix', {
        label: chain.name,
      });
    }

    return chain.name;
  }

  return fallBackName;
};

export const useMainForm = (shouldSkipFormReset?: boolean) => {
  const {
    allSelectedChainIds: chainIds,
    whitelistDialog,
    isValid,
    onChange,
  } = useProjectFormValues();

  const { data: chainsData } = useAppSelector(selectBlockchains);

  const selectedType = whitelistDialog?.type;

  const isTypeSelected = Boolean(selectedType);
  const isSmartContractAddressSelected = selectedType === WhiteListItem.address;
  const isValueFilled = Boolean(whitelistDialog?.value);
  const isAtLeastOneChainSelected = whitelistDialog?.chains?.length > 0;

  const isFormFilled =
    isTypeSelected && isAtLeastOneChainSelected && isValueFilled;

  const preparedChains = useMemo(
    () =>
      chainIds.map(chainId => {
        const fallBackName = getChainName(chainId);

        const currentChain = chainsData?.find(chain => chain.id === chainId);

        const chainLabel = getChainLabel(fallBackName, currentChain);

        const name = getCustomLabelForChainsCornerCases({
          chainId,
          label: chainLabel,
        });

        return {
          id: chainId,
          disabled: isSmartContractAddressSelected
            ? !isEVMBased(chainId)
            : false,
          name,
        };
      }),
    [chainsData, isSmartContractAddressSelected, chainIds],
  );

  const handleOnChange = useCallback(() => {
    if (shouldSkipFormReset) return;

    if (whitelistDialog?.chains)
      onChange(AddToWhitelistFormFields.chains, undefined);
    if (whitelistDialog?.value)
      onChange(AddToWhitelistFormFields.value, undefined);
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
  };
};
