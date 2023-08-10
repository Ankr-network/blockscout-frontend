import { Typography } from '@mui/material';
import { FormApi } from 'final-form';
import { FormRenderProps } from 'react-final-form';
import { t } from '@ankr.com/common';

import {
  ANKR_MAX_DECIMALS,
  ANKR_MAX_DIGITS,
} from 'domains/account/actions/topUp/const';
import { AnkrAmountField } from 'domains/account/components/TopUpForm/components/AnkrAmountField';
import { BundlePaymentBanner } from 'domains/account/components/TopUpForm/components/BundlePaymentBanner';

import { FormField } from '../../constants';
import { FormValues } from '../../types';
import { SubmitButton } from '../SubmitButton';
import { useNativeForm } from './hooks/useNativeForm';
import { useNativeFormStyles } from './NativeFormStyles';

export interface NativeFormProps {
  amount: string;
  change: FormApi<FormValues>['change'];
  handleSubmit: FormRenderProps<FormValues>['handleSubmit'];
  onBundleBannerClick: () => void;
  valid: FormRenderProps<FormValues>['valid'];
  validateAmount: (amount: string) => string | undefined;
}

export const NativeForm = ({
  amount,
  change,
  handleSubmit,
  onBundleBannerClick,
  valid,
  validateAmount,
}: NativeFormProps) => {
  const { hasInfo } = useNativeForm({ amount, valid });

  const { classes } = useNativeFormStyles();

  return (
    <form autoComplete="off" className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.nativeFormInner}>
        <Typography
          className={classes.amountLabel}
          component="div"
          variant="subtitle2"
        >
          {t('account.account-details.top-up.ankr-amount-label')}
        </Typography>
        <AnkrAmountField
          amount={amount}
          change={change}
          className={classes.amount}
          maxDecimals={ANKR_MAX_DECIMALS}
          maxLength={ANKR_MAX_DIGITS}
          name={FormField.Amount}
          validate={validateAmount}
        />
        {hasInfo && (
          <Typography
            className={classes.info}
            textAlign="center"
            variant="body2"
          >
            {t('account.account-details.top-up.info')}
          </Typography>
        )}
        <BundlePaymentBanner onClick={onBundleBannerClick} />
      </div>
      <SubmitButton />
    </form>
  );
};
