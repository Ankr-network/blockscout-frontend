import { Ankr, CreditCard } from '@ankr.com/ui';
import { ReactNode } from 'react';

import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { SoonLabel } from 'modules/common/components/SoonLabel';

import { TopUpCurrency } from '../types';

export interface TabTitleParams {
  currency: TopUpCurrency;
  isDisabled?: boolean;
  isSelected: boolean;
}

export const iconsMap: Record<TopUpCurrency, ReactNode> = {
  [TopUpCurrency.ANKR]: <Ankr />,
  [TopUpCurrency.USD]: <CreditCard />,
};

export const renderTabTitle = ({
  currency,
  isDisabled,
  isSelected,
}: TabTitleParams) => (
  <SecondaryTab
    disabled={isDisabled}
    endIcon={isDisabled ? <SoonLabel /> : undefined}
    isSelected={isSelected}
    label={currency}
    startIcon={iconsMap[currency]}
  />
);
