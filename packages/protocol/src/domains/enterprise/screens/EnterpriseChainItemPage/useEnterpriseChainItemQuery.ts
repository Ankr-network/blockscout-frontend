import { useMemo } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import { selectEnterpriseChains } from 'domains/enterprise/store/selectors';
import { EnterpriseRoutesConfig } from 'domains/enterprise/routes';
import { IPrivateChainItemDetails } from 'domains/chains/actions/private/types';

export const useEnterpriseChainItemQuery = () => {
  const { chainId } = EnterpriseRoutesConfig.chainDetails.useParams();

  const { chains, isLoading } = useAppSelector(selectEnterpriseChains);

  const chain = useMemo(
    () => chains.find(({ id }) => id === chainId),
    [chains, chainId],
  );

  if (!chain) {
    return {
      chainId,
      chainData: undefined,
      isLoading,
    };
  }

  const chainData: IPrivateChainItemDetails = {
    chain,
  };

  return { chainId, chainData, isLoading };
};
