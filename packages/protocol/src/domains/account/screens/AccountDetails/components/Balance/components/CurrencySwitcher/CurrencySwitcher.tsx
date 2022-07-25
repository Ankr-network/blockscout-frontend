import React from 'react';

import { Currency } from 'domains/account/types';
import { Switcher } from 'modules/common/components/Switcher';
import { valuesMap } from './const';

export interface CurrencySwitcherProps {
  currency: Currency;
  onClick: () => void;
}

type Props = CurrencySwitcherProps;

export const CurrencySwitcher = ({ currency, onClick }: Props) => (
  <Switcher onClick={onClick} value={valuesMap[currency]} />
);
