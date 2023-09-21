import { Chain, ChainID, ChainSubType } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';

import { ChainTypeTab } from '../components/ChainTypeTab';
import { chainSubTypeTabs } from '../constants/chainTypeTabs';

export const getChainSubTypeTabs = ({
  chain,
}: {
  chain: Chain;
}): Tab<ChainSubType>[] => {
  if (chain.id === ChainID.ZETACHAIN) {
    return chainSubTypeTabs.map(({ id, title }) => ({
      id,
      title: (isSelected: boolean) => (
        <ChainTypeTab isSelected={isSelected} label={title} />
      ),
      isDisabled: false,
    }));
  }

  return [];
};
