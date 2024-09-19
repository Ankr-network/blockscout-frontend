import { t } from '@ankr.com/common';
import { ChainSubType, ChainType } from '@ankr.com/chains-list';

import { Tab } from 'modules/common/hooks/useTabs';

export const getChainTypeTabs = (): Tab<ChainType>[] => [
  {
    id: ChainType.Mainnet,
    title: t('chain-item.chain-types.mainnet'),
  },
  {
    id: ChainType.Testnet,
    title: t('chain-item.chain-types.testnet'),
  },
  {
    id: ChainType.Devnet,
    title: t('chain-item.chain-types.devnet'),
  },
];

const getAthens3 = () => t('chain-item.chain-subtypes.athens3');

export const chainSubTypeTabs: Tab<ChainSubType>[] = [
  {
    id: ChainSubType.Athens3,
    title: getAthens3(),
  },
];
