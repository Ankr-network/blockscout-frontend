import { ChartCurrency } from '../types';
import { useSwitcher } from 'modules/common/hooks/useSwitcher';

const { ANKR, USD } = ChartCurrency;

const items: ChartCurrency[] = [ANKR, USD];

export const useCurrency = (): [ChartCurrency, () => void] => {
  const [currency, switchCurrency] = useSwitcher({ items });

  return [currency, switchCurrency];
};
