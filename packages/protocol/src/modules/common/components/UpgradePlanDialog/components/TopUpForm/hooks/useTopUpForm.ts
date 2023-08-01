import { TopUpCurrency } from '../types';
import { useAmount } from './useAmount';
import { useCurrencyTabs } from './useCurrencyTabs';
import { useEmailDialog } from './useEmailDialog';
import { useUSDPrice } from './useUSDPrice';

export const useTopUpForm = (initialCurrency?: TopUpCurrency) => {
  const { currency, renderProps: currencyProps } =
    useCurrencyTabs(initialCurrency);

  const {
    emailDialogProps,
    open: openEmailDialog,
    shouldBeOpened: shouldOpenEmailDialog,
  } = useEmailDialog();

  const {
    fixedUSDAmount,
    renderProps: usdPriceProps,
    usdPrice,
  } = useUSDPrice(currency);

  const amountProps = useAmount({
    currency,
    fixedUSDAmount,
    openEmailDialog,
    shouldOpenEmailDialog,
    usdPrice,
  });

  return {
    amountProps,
    currencyProps,
    emailDialogProps,
    usdPriceProps,
  };
};
