import { useCallback, useMemo } from 'react';
import { t } from '@ankr.com/common';
import { Chain, ChainID } from 'domains/chains/types';
import { useAppSelector } from 'store/useAppSelector';
import { selectChainsWithStats } from 'domains/dashboard/store/selectors';
import { SelectedContent } from '../SelectedContent';
import { SelectedChainContent } from '../SelectedChainContent';

export const ALL_CHAINS_VALUE = ChainID.UNDEFINED;
export const ALL_CHAINS_LABEL = t('dashboard.all');

interface ISelectOption {
  value: ChainID;
  label: string;
}

const ALL_CHAINS_ITEM: ISelectOption = {
  value: ALL_CHAINS_VALUE,
  label: ALL_CHAINS_LABEL,
};

const DEFAULT_OPTIONS_LIST: ISelectOption[] = [ALL_CHAINS_ITEM];

export const useChainSelector = (chains: Chain[]) => {
  const chainIds = useAppSelector(selectChainsWithStats);

  const options: ISelectOption[] = useMemo(
    () =>
      DEFAULT_OPTIONS_LIST.concat(
        chains
          // filtering chains to get only chains with stats for selector
          .filter(chain =>
            chainIds.some(
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
    [chains, chainIds],
  );

  const renderValue = useCallback(
    (value: ChainID) => {
      const chain = chains.find(item => item.id === value);

      return chain ? (
        <SelectedChainContent chain={chain} />
      ) : (
        <SelectedContent>{ALL_CHAINS_LABEL}</SelectedContent>
      );
    },
    [chains],
  );

  return { options, renderValue, defaultValue: ALL_CHAINS_VALUE };
};
