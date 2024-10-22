import { IBlockchainEntity, Chain } from '@ankr.com/chains-list';
import { useMemo } from 'react';

import { selectBlockchains } from 'modules/chains/store/selectors';
import { selectEnterpriseApiKeysAsJWTs } from 'domains/enterprise/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { getSubchainIds } from './utils/getSubchainIds';

const defaultBlockchains: IBlockchainEntity[] = [];

export const useApiKeys = (chain?: Chain) => {
  const { data: blockchains = defaultBlockchains } =
    useAppSelector(selectBlockchains);

  const { apiKeys = [], isLoading } = useAppSelector(
    selectEnterpriseApiKeysAsJWTs,
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
