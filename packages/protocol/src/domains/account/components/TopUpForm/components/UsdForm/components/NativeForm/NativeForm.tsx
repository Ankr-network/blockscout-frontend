import { FormApi } from 'final-form';
import { FormRenderProps } from 'react-final-form';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { AmountField } from 'domains/account/components/TopUpForm/components/AmountField';
import { AmountValidator } from 'domains/account/components/TopUpForm/types';
import { BundlePaymentBanner } from 'domains/account/components/TopUpForm/components/BundlePaymentBanner';
import {
  MAX_USD_DECIMALS,
  USD_CURRENCY,
} from 'domains/account/actions/usdTopUp/const';

import { FormField } from '../../constants';
import { FormValues, OnChange } from '../../types';
import { PriceTabs } from '../PriceTabs';
import { SubmitButton } from '../SubmitButton';
import { useNativeFormStyles } from './NativeFormStyles';

export interface NativeFormProps {
  amount: string;
  canEditAmount: boolean;
  change: FormApi<FormValues>['change'];
  handleAmountChange: OnChange;
  handleOpenBundleDialog: () => void;
  handleSubmit: FormRenderProps<FormValues>['handleSubmit'];
  initialPriceId: string;
  isBundlePayment: boolean;
  isValidating: boolean;
  onBundleBannerClick: () => void;
  validateAmount: AmountValidator;
  isLoading: boolean;
}

export const NativeForm = ({
  amount,
  canEditAmount,
  change,
  handleAmountChange,
  handleOpenBundleDialog,
  handleSubmit,
  initialPriceId,
  isBundlePayment,
  isValidating,
  onBundleBannerClick,
  validateAmount,
  isLoading,
}: NativeFormProps) => {
  const { classes } = useNativeFormStyles();

  return (
    <form autoComplete="off" className={classes.root} onSubmit={handleSubmit}>
      <div>
        <Typography
          className={classes.amountLabel}
          component="div"
          variant="subtitle2"
        >
          {t('account.account-details.top-up.amount-label')}
        </Typography>
        <PriceTabs
          initialTabID={initialPriceId}
          onChange={handleAmountChange}
        />
        <AmountField
          amount={amount}
          change={change}
          currency={USD_CURRENCY}
          isBundlePayment={isBundlePayment}
          isDisabled={!canEditAmount}
          isUSD
          maxDecimals={MAX_USD_DECIMALS}
          maxLength={6}
          name={FormField.Amount}
          validate={validateAmount}
        />
        <BundlePaymentBanner onClick={onBundleBannerClick} />
      </div>
      <SubmitButton
        hasCancelLabel={!canEditAmount}
        onClick={isBundlePayment ? handleOpenBundleDialog : handleSubmit}
        isDisabled={isValidating || isLoading}
        isLoading={isLoading}
      />
    </form>
  );
};
