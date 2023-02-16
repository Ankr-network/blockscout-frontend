import { useAmount } from './useAmount';
import { useCurrencyTabs } from './useCurrencyTabs';
import { useEmailDialog } from './useEmailDialog';
import { useUSDPrice } from './useUSDPrice';

export const useTopUpForm = () => {
  const { currency, renderProps: currencyProps } = useCurrencyTabs();

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
