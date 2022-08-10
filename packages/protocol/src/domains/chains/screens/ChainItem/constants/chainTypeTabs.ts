import { ChainType } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { t } from 'modules/i18n/utils/intl';

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
