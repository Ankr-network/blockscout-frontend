import { IBlockchainEntity } from 'multirpc-sdk';
import { useMemo } from 'react';

import { Chain } from 'modules/chains/types';
import { selectBlockchains } from 'modules/chains/store/selectors';
import { selectEnterpriseApiKeysAsJwtManagerTokens } from 'domains/enterprise/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { getSubchainIds } from './utils/getSubchainIds';

const defaultBlockchains: IBlockchainEntity[] = [];

export const useApiKeys = (chain?: Chain) => {
  const { data: blockchains = defaultBlockchains } =
    useAppSelector(selectBlockchains);

  const { apiKeys = [], isLoading } = useAppSelector(
    selectEnterpriseApiKeysAsJwtManagerTokens,
  );

  const chainId = chain?.id;

  const subchainIds = useMemo(
    () => [chainId, ...getSubchainIds(blockchains, chainId)],
    [blockchains, chainId],
  );

  const filteredApiKeys = useMemo(
    () =>
      apiKeys.filter(apiKey =>
        apiKey.blockchains?.some(({ blockchain }) =>
          subchainIds.includes(blockchain),
        ),
      ),
    [apiKeys, subchainIds],
  );

  return {
    apiKeys: chain ? filteredApiKeys : apiKeys,
    isLoading,
  };
};
