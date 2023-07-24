import BigNumber from 'bignumber.js';
import { Button, Typography } from '@mui/material';
import { ClassNameMap } from '@mui/material/styles';
import { FormRenderProps } from 'react-final-form';
import { TopUp } from '@ankr.com/ui';
import { push } from 'connected-react-router';
import { t } from '@ankr.com/common';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  ANKR_CURRENCY,
  ANKR_MAX_DECIMALS,
  ANKR_MAX_DIGITS,
  DEFAULT_ANKR_VALUE,
} from 'domains/account/actions/topUp/const';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { NavLink } from 'uiKit/NavLink';
import { TopUpCurrency } from 'modules/analytics/mixpanel/const';
import { TrackTopUpSubmit } from 'domains/account/types';
import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { resetTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { useConnectButton } from 'modules/common/components/UpgradePlanDialog/components/TopUpForm/hooks/useConnectButton';
import { useDialog } from 'modules/common/hooks/useDialog';
import { MILLION_ANKR_TOKENS } from 'modules/common/components/UpgradePlanDialog/components/TopUpForm/components/AmountField';

import { BundlePaymentBanner } from '../BundlePaymentBanner';
import { BundlePaymentDialog } from '../BundlePaymentDialog';
import { AmountInputField, TopUpFormValues } from './ANKRTopUpFormTypes';
import { AmountField } from './AmountField';

export const useRenderDisabledForm = (classes: ClassNameMap) => {
  const isMobile = useIsSMDown();

  return useCallback(
    ({ values }: FormRenderProps<TopUpFormValues>) => {
      return (
        <form autoComplete="off" className={classes.form}>
          <div>
            <Typography
              className={classes.amountLabel}
              component="div"
              variant="subtitle2"
            >
              {t('account.account-details.top-up.ankr-amount-label')}
            </Typography>
            <AmountField
              amount={values.amount}
              name={AmountInputField.amount}
              isDisabled
              currency={ANKR_CURRENCY}
              maxLength={ANKR_MAX_DIGITS}
            />
          </div>
          <NavLink
            color="primary"
            variant="contained"
            fullWidth
            className={classes.button}
            href={AccountRoutesConfig.topUp.generatePath()}
          >
            {t(
              `account.account-details.top-up.${
                isMobile ? 'continue-mobile' : 'continue-desktop'
              }`,
            )}
          </NavLink>
        </form>
      );
    },
    [classes, isMobile],
  );
};

interface RenderFormParams {
  classes: ClassNameMap;
  isWalletConnected: boolean;
  trackSubmit?: TrackTopUpSubmit;
  validateAmount?: any;
}

export const useRenderForm = ({
  classes,
  isWalletConnected,
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

      const button = isWalletConnected ? (
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
      isWalletConnected,
      onClose,
      onOpen,
      trackSubmit,
      validateAmount,
    ],
  );
};

export const useCheckBrokenTransaction = () => {
  const transaction = useSelectTopUpTransaction();

  const { handleResetTopUpTransaction } = useTopUp();

  const isAmountEmpty = !transaction?.amount || transaction?.amount?.isZero();

  if (
    isAmountEmpty &&
    (transaction?.allowanceTransactionHash || transaction?.topUpTransactionHash)
  ) {
    handleResetTopUpTransaction();
  }
};

export const useInitialValues = (
  hasLoginStep = false,
  defaultInitialValues = {},
) => {
  const transaction = useSelectTopUpTransaction();

  const isTopUpInProcess = Boolean(
    transaction?.allowanceTransactionHash ||
      transaction?.topUpTransactionHash ||
      hasLoginStep,
  );

  const initialValues = useMemo(() => {
    if (isTopUpInProcess) {
      return {
        [AmountInputField.amount]: new BigNumber(
          transaction?.amount ?? 0,
        ).toString(10),
      };
    }

    return defaultInitialValues;
  }, [transaction?.amount, isTopUpInProcess, defaultInitialValues]);

  return { transaction, isTopUpInProcess, initialValues };
};

export const useOnTopUpSubmit = (
  confirmedEmail?: string,
  pendingEmail?: string,
  trackSubmit: TrackTopUpSubmit = () => {},
) => {
  const [showEmailBanner, setShowEmailBanner] = useState(false);

  const dispatch = useDispatch();
  const { handleSetAmount } = useTopUp();

  const onSuccess = useCallback(() => {
    dispatch(resetTopUpOrigin());
    dispatch(push(AccountRoutesConfig.topUp.generatePath()));
  }, [dispatch]);

  const onClose = useCallback(() => {
    setShowEmailBanner(false);
  }, []);

  const onSubmit = useCallback(
    (data: TopUpFormValues) => {
      handleSetAmount(new BigNumber(data.amount));

      if (!confirmedEmail || pendingEmail) {
        setShowEmailBanner(true);
      } else {
        onSuccess();

        trackSubmit(data.amount, TopUpCurrency.ANKR);
      }
    },
    [handleSetAmount, confirmedEmail, onSuccess, pendingEmail, trackSubmit],
  );

  return { onSubmit, isOpened: showEmailBanner, onClose };
};

export const validateAnkrAmount = (
  value: string,
  shouldValidateMinValue: boolean,
  ankrBalance?: BigNumber,
) => {
  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (currentAmount.isZero()) {
    return t('validation.min-greater', {
      value: 0,
    });
  }

  if (shouldValidateMinValue && currentAmount.isLessThan(DEFAULT_ANKR_VALUE)) {
    return t('plan.premium-block.min', {
      value: DEFAULT_ANKR_VALUE.toFormat(),
    });
  }

  if (ankrBalance?.isLessThan(value)) {
    return t('plan.premium-block.balance');
  }

  return undefined;
};
