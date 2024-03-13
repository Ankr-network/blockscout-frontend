import BigNumber from 'bignumber.js';
import { ClassNameMap } from '@mui/material/styles';
import { FormRenderProps } from 'react-final-form';
import { TopUp } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { Button, Typography } from '@mui/material';

import { ConnectButton } from 'domains/auth/components/ConnectButton';
import {
  ANKR_CURRENCY,
  ANKR_MAX_DECIMALS,
  ANKR_MAX_DIGITS,
} from 'domains/account/actions/topUp/const';
import { TrackTopUpSubmit } from 'domains/account/types';
import { useConnectButton } from 'modules/common/components/UpgradePlanDialog/components/TopUpForm/hooks/useConnectButton';
import { MILLION_ANKR_TOKENS } from 'modules/common/components/UpgradePlanDialog/components/TopUpForm/components/AmountField';
import { useDialog } from 'modules/common/hooks/useDialog';

import { BundlePaymentBanner } from '../../BundlePaymentBanner';
import { BundlePaymentDialog } from '../../BundlePaymentDialog';
import { AmountInputField, TopUpFormValues } from '../ANKRTopUpFormTypes';
import { AmountField } from '../AmountField';

interface RenderFormParams {
  classes: ClassNameMap;
  isLoggedIn: boolean;
  trackSubmit?: TrackTopUpSubmit;
  validateAmount?: any;
}

export const useRenderForm = ({
  classes,
  isLoggedIn,
  trackSubmit,
  validateAmount,
}: RenderFormParams) => {
  const { buttonText, hasConnectButton } = useConnectButton();
  const { isOpened, onClose, onOpen } = useDialog();

  return useCallback(
    ({
      handleSubmit,
      validating,
      form: { change, submit },
      values,
      valid,
    }: FormRenderProps<TopUpFormValues>) => {
      const amountValue = new BigNumber(values?.amount || 0);

      const button = isLoggedIn ? (
        <Button
          className={classes.button}
          color="primary"
          disabled={validating}
          fullWidth
          startIcon={<TopUp />}
          type="submit"
        >
          {t('account.account-details.top-up.top-up')}
        </Button>
      ) : (
        <ConnectButton
          variant="contained"
          buttonText={t('common.submit')}
          onSuccess={submit}
          className={classes.button}
        />
      );

      const connectWalletButton = hasConnectButton && (
        <ConnectButton
          buttonText={buttonText}
          className={classes.button}
          variant="contained"
        />
      );

      return (
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <div>
            <Typography
              className={classes.amountLabel}
              component="div"
              variant="subtitle2"
            >
              {t('account.account-details.top-up.ankr-amount-label')}
            </Typography>
            <AmountField
              amount={values?.amount}
              change={change}
              className={classes.amount}
              currency={ANKR_CURRENCY}
              maxDecimals={ANKR_MAX_DECIMALS}
              maxLength={ANKR_MAX_DIGITS}
              name={AmountInputField.amount}
              validate={validateAmount}
            />
            {amountValue.isGreaterThanOrEqualTo(MILLION_ANKR_TOKENS) && valid && (
              <Typography
                variant="body2"
                className={classes.info}
                textAlign="center"
              >
                {t('account.account-details.top-up.info')}
              </Typography>
            )}
            <BundlePaymentBanner onClick={onOpen} />
          </div>
          {connectWalletButton || button}
          <BundlePaymentDialog
            isOpened={isOpened}
            onClose={onClose}
            trackSubmit={trackSubmit}
          />
        </form>
      );
    },
    [
      buttonText,
      classes,
      hasConnectButton,
      isOpened,
      isLoggedIn,
      onClose,
      onOpen,
      trackSubmit,
      validateAmount,
    ],
  );
};
