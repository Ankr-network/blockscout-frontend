import { useSwitcher } from 'modules/common/hooks/useSwitcher';
import { ChartCurrency } from '../types';

const { CREDIT } = ChartCurrency;

const items: ChartCurrency[] = [CREDIT];

export const useCurrency = (): [ChartCurrency, () => void] => {
  const [currency, switchCurrency] = useSwitcher({ items });

  return [currency, switchCurrency];
};
