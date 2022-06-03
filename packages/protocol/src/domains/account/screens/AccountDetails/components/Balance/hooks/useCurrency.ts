import { Currency } from 'domains/account/types';
import { useSwitcher } from 'domains/account/hooks/useSwitcher';

const { ANKR, CREDIT } = Currency;

const items: Currency[] = [ANKR, CREDIT];

export const useCurrency = (): [Currency, () => void] => {
  const [currency, switchCurrency] = useSwitcher({ items });

  return [currency, switchCurrency];
};
