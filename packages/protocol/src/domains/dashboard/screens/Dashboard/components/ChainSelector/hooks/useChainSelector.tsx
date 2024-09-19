import { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';
import { Chain, ChainID } from '@ankr.com/chains-list';

import { SelectedContent } from '../SelectedContent';
import { SelectedChainContent } from '../SelectedChainContent';

export const ALL_CHAINS_VALUE = ChainID.UNDEFINED;

interface ISelectOption {
  value: ChainID;
  label: string;
}

const getAllChainsLabel = () => {
  return t('dashboard.all');
};

const getDefaultOptions = (): ISelectOption[] => [
  {
    value: ALL_CHAINS_VALUE,
    label: getAllChainsLabel(),
  },
];

export const useChainSelector = (
  chains: Chain[],
  chainIdsWithStats: ChainID[],
) => {
  const options: ISelectOption[] = useMemo(
    () =>
      getDefaultOptions().concat(
        chains
          // filtering chains to get only chains with stats for selector
          .filter(chain =>
            chainIdsWithStats.some(
              chainId => chainId.startsWith(chain.id) || chainId === chain.id,
            ),
          )
          .map(chain => {
            return {
              value: chain.id,
              label: chain.name,
            };
          }),
      ),
    [chains, chainIdsWithStats],
  );

  const renderValue = useCallback(
    (value: ChainID) => {
      const chain = chains.find(item => item.id === value);

      return chain ? (
        <SelectedChainContent chain={chain} />
      ) : (
        <SelectedContent>{getAllChainsLabel()}</SelectedContent>
      );
    },
    [chains],
  );

  return { options, renderValue, defaultValue: ALL_CHAINS_VALUE };
};
