import { Chain, ChainID, ChainSubType } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';

import { chainSubTypeTabs } from '../constants/chainTypeTabs';
import { SecondaryTab } from '../components/SecondaryTab';

export const getChainSubTypeTabs = ({
  chain,
}: {
  chain: Chain;
}): Tab<ChainSubType>[] => {
  if (chain.id === ChainID.ZETACHAIN) {
    return chainSubTypeTabs.map(({ id, title }) => ({
      id,
      title: (isSelected: boolean) => (
        <SecondaryTab isSelected={isSelected} label={title} />
      ),
      isDisabled: false,
    }));
  }

  return [];
};
