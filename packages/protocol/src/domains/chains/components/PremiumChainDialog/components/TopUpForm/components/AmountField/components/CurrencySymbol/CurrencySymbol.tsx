import { TopUpCurrency } from 'domains/chains/components/PremiumChainDialog/components/TopUpForm/types';
import { useCurrencySymbolStyles } from './CurrencySymbolStyles';

export interface CurrencySymbolProps {
  currency: TopUpCurrency;
  isDisabled?: boolean;
}

const symbolsMap: Record<TopUpCurrency, string> = {
  [TopUpCurrency.ANKR]: '',
  [TopUpCurrency.USD]: '$',
};

export const CurrencySymbol = ({
  currency,
  isDisabled = false,
}: CurrencySymbolProps) => {
  const { classes } = useCurrencySymbolStyles(isDisabled);

  const currencySymbol = symbolsMap[currency];

  return currencySymbol ? (
    <span className={classes.root}>{currencySymbol}</span>
  ) : null;
};
