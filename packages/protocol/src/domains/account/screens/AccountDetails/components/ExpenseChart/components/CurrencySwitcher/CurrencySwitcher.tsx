import { Switcher } from 'modules/common/components/Switcher';

import { ChartCurrency } from '../../types';
import { valuesMap } from './const';

export interface CurrencySwitcherProps {
  currency: ChartCurrency;
  onClick: () => void;
}

type Props = CurrencySwitcherProps;

export const CurrencySwitcher = ({ currency, onClick }: Props) => (
  <Switcher onClick={onClick} value={valuesMap[currency]?.()} />
);
