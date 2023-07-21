import { t } from '@ankr.com/common';

import { ChainSubType, ChainType } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';

const mainnets = t('chain-item.chain-types.mainnet');
const testnets = t('chain-item.chain-types.testnet');
const devnets = t('chain-item.chain-types.devnet');

export const chainTypeTabs: Tab<ChainType>[] = [
  {
    id: ChainType.Mainnet,
    title: mainnets,
  },
  {
    id: ChainType.Testnet,
    title: testnets,
  },
  {
    id: ChainType.Devnet,
    title: devnets,
  },
];

const getAthens2 = () => t('chain-item.chain-subtypes.athens2');
const getAthens3 = () => t('chain-item.chain-subtypes.athens3');

export const chainSubTypeTabs: Tab<ChainSubType>[] = [
  {
    id: ChainSubType.Athens2,
    title: getAthens2(),
  },
  {
    id: ChainSubType.Athens3,
    title: getAthens3(),
  },
];
