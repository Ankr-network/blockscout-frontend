import { CreditCard, CryptoWalletIcon } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { ECurrency } from 'modules/billing/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { renderCurrencyLabel } from 'modules/billing/utils/renderCurrencyLabel';

import { CurrencyTab } from '../../CurrencyTab';

export interface IGetCurrencyTabsParams {
  disabledCurrencies?: ECurrency[];
}

export enum ECurrencyTab {
  ANKR = 'ANKR',
  USD = 'USD',
  STABLECOIN = 'STABLECOIN',
}

export const getCurrencyTabs = ({
  disabledCurrencies,
}: IGetCurrencyTabsParams): Tab<ECurrencyTab>[] => [
  {
    id: ECurrencyTab.USD,
    isDisabled: disabledCurrencies?.includes(ECurrency.USD),
    title: (isSelected: boolean, isDisabled: boolean) => (
      <CurrencyTab
        icon={<CreditCard />}
        isDisabled={isDisabled}
        isSelected={isSelected}
        label={renderCurrencyLabel(ECurrency.USD)}
      />
    ),
  },
  {
    id: ECurrencyTab.ANKR,
    isDisabled: disabledCurrencies?.includes(ECurrency.ANKR),
    title: (isSelected: boolean, isDisabled: boolean) => (
      <CurrencyTab
        icon={<CryptoWalletIcon />}
        isDisabled={isDisabled}
        isSelected={isSelected}
        label={renderCurrencyLabel(ECurrency.ANKR)}
        promo={t('account.currencies.additional.ankr-promo')}
      />
    ),
    tooltip: disabledCurrencies?.includes(ECurrency.ANKR)
      ? undefined
      : t('account.currencies.additional.ankr-tooltip'),
  },
  {
    id: ECurrencyTab.STABLECOIN,
    isDisabled:
      disabledCurrencies?.includes(ECurrency.USDT) ||
      disabledCurrencies?.includes(ECurrency.USDC),
    title: (isSelected: boolean, isDisabled: boolean) => (
      <CurrencyTab
        icon={<CryptoWalletIcon />}
        isDisabled={isDisabled}
        isSelected={isSelected}
        label={renderCurrencyLabel(ECurrency.USDT)}
      />
    ),
  },
];
