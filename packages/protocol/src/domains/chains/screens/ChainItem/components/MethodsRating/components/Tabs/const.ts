import { ChainType } from 'domains/chains/types';
import { t } from 'modules/i18n/utils/intl';

export const tabTitlesMap: Record<ChainType, string> = {
  [ChainType.Mainnet]: t('chain-item.header.mainnet-tab-title'),
  [ChainType.Testnet]: t('chain-item.header.testnet-tab-title'),
};
