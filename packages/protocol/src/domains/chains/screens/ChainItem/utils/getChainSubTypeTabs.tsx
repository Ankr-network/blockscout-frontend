import { Chain, ChainID, ChainSubType } from 'modules/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';

import { ChainTypeTab } from '../components/ChainTypeTab';
import { chainSubTypeTabs } from '../constants/chainTypeTabs';

export interface ChainSubtypeTabsParams {
  availableSubtypes?: ChainSubType[];
  chain: Chain;
}

export const getChainSubTypeTabs = ({
  chain,
  availableSubtypes = [ChainSubType.Athens3],
}: ChainSubtypeTabsParams) => {
  if (chain.id === ChainID.ZETACHAIN) {
    return chainSubTypeTabs
      .filter(({ id }) => availableSubtypes.includes(id))
      .map<Tab<ChainSubType>>(({ id, title }) => ({
        id,
        title: (isSelected: boolean) => (
          <ChainTypeTab isSelected={isSelected} label={title} />
        ),
        isDisabled: false,
      }));
  }

  return [];
};
