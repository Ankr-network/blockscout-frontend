import { Ankr, CreditCard } from '@ankr.com/ui';
import { ReactNode } from 'react';

import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { TopUpCurrency } from '../types';

export interface TabTitleParams {
  currency: TopUpCurrency;
  isSelected: boolean;
}

export const iconsMap: Record<TopUpCurrency, ReactNode> = {
  [TopUpCurrency.ANKR]: <Ankr />,
  [TopUpCurrency.USD]: <CreditCard />,
};

export const renderTabTitle = ({ currency, isSelected }: TabTitleParams) => (
  <SecondaryTab
    isSelected={isSelected}
    label={currency}
    startIcon={iconsMap[currency]}
  />
);
