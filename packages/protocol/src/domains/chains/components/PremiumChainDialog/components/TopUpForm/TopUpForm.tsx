import { AmountForm } from './components/AmountForm';
import { CurrencySelector } from './components/CurrencySelector';
import { TopUpEmailDialog } from 'domains/account/components/TopUp/ANKRTopUpForm/TopUpEmailDialog';
import { USDPriceSelector } from './components/USDPiceSelector';
import { useTopUpForm } from './hooks/useTopUpForm';
import { useTopUpFormStyles } from './TopUpFormStyles';

export const TopUpForm = () => {
  const { amountProps, currencyProps, emailDialogProps, usdPriceProps } =
    useTopUpForm();

  const { classes } = useTopUpFormStyles();

  return (
    <div className={classes.root}>
      <CurrencySelector {...currencyProps} />
      {usdPriceProps && <USDPriceSelector {...usdPriceProps} />}
      <AmountForm {...amountProps} />
      <TopUpEmailDialog {...emailDialogProps} />
    </div>
  );
};
