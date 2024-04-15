import { CreditCard, CryptoWalletIcon } from '@ankr.com/ui';

import { ECurrency } from 'modules/billing/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { renderCurrencyLabel } from 'modules/billing/utils/renderCurrencyLabel';

import { CurrencyTab } from '../../CurrencyTab';

export interface IGetCurrencyTabsParams {
  disabledCurrencies?: ECurrency[];
}

export const getCurrencyTabs = ({
  disabledCurrencies,
}: IGetCurrencyTabsParams): Tab<ECurrency>[] => [
  {
    id: ECurrency.USD,
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
    id: ECurrency.ANKR,
    isDisabled: disabledCurrencies?.includes(ECurrency.ANKR),
    title: (isSelected: boolean, isDisabled: boolean) => (
      <CurrencyTab
        icon={<CryptoWalletIcon />}
        isDisabled={isDisabled}
        isSelected={isSelected}
        label={renderCurrencyLabel(ECurrency.ANKR)}
      />
    ),
  },
];
