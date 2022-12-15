import { Button } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormRenderProps } from 'react-final-form';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { MessageEventData } from '@ankr.com/provider';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { t } from 'modules/i18n/utils/intl';
import { NavLink, useIsSMDown } from 'ui';
import { AmountField } from './AmountField';
import { AmountInputField, TopUpFormValues } from './ANKRTopUpFormTypes';
import { getLastLockedFundsEvent } from 'domains/account/actions/topUp/getLastLockedFundsEvent';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { MultiService } from 'modules/api/MultiService';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { RateBlock } from './RateBlock';
import { ConnectButton } from 'domains/auth/components/ConnectButton';
import {
  ANKR_CURRENCY,
  DEFAULT_ANKR_VALUE,
  ANKR_MAX_DECIMALS,
  ANKR_MAX_DIGITS,
} from 'domains/account/actions/topUp/const';

export const useRenderDisabledForm = (classes: ClassNameMap) => {
  const isMobile = useIsSMDown();

  return useCallback(
    ({ values }: FormRenderProps<TopUpFormValues>) => {
      return (
        <form autoComplete="off" className={classes.form}>
          <AmountField
            name={AmountInputField.amount}
            isDisabled
            currency={ANKR_CURRENCY}
            maxLength={ANKR_MAX_DIGITS}
          />
          <RateBlock
            value={values[AmountInputField.amount]}
            currency={ANKR_CURRENCY}
          />
          <NavLink
            color="primary"
            variant="contained"
            fullWidth
            className={classes.button}
            href={AccountRoutesConfig.topUp.generatePath()}
          >
            {t(
              `account.account-details.top-up.${
                isMobile ? 'continue' : 'continue-button'
              }`,
            )}
          </NavLink>
        </form>
      );
    },
    [classes.button, classes.form, isMobile],
  );
};

interface RenderFormParams {
  classes: ClassNameMap;
  validateAmount?: any;
  isWalletConnected: boolean;
}

export const useRenderForm = ({
  classes,
  validateAmount,
  isWalletConnected,
}: RenderFormParams) => {
  return useCallback(
    ({
      handleSubmit,
      validating,
      form: { change, submit },
      values,
    }: FormRenderProps<TopUpFormValues>) => {
      return (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <AmountField
            name={AmountInputField.amount}
            change={change}
            maxDecimals={ANKR_MAX_DECIMALS}
            currency={ANKR_CURRENCY}
            validate={validateAmount}
            maxLength={ANKR_MAX_DIGITS}
          />

          <RateBlock
            value={values[AmountInputField.amount]}
            currency={ANKR_CURRENCY}
          />

          {isWalletConnected ? (
            <Button
              color="primary"
              fullWidth
              type="submit"
              disabled={validating}
              className={classes.button}
            >
              {t('account.account-details.top-up.button')}
            </Button>
          ) : (
            <ConnectButton
              variant="contained"
              buttonText={t('common.submit')}
              onSuccess={submit}
              className={classes.button}
            />
          )}
        </form>
      );
    },
    [classes.button, classes.form, validateAmount, isWalletConnected],
  );
};

export const useCheckLoginStep = () => {
  const { data: lastLockedFundsEvent, loading } = useQuery<MessageEventData>({
    type: getLastLockedFundsEvent.toString(),
  });

  const { credentials, isWalletConnected, workerTokenData } = useAuth();
  const { handleSetAmount } = useTopUp();

  const dispatchRequest = useDispatchRequest();
  const [hasLoginStep, setHasLoginStep] = useState<boolean>(false);

  useEffect(() => {
    if (isWalletConnected) dispatchRequest(getLastLockedFundsEvent());
  }, [dispatchRequest, isWalletConnected]);

  useEffect(() => {
    const checkAmountAndSetTokenIssuanceStep = async () => {
      const service = await MultiService.getWeb3Service();
      const keyProvider = service.getKeyProvider();
      const { currentAccount: address } = keyProvider;

      if (!lastLockedFundsEvent) return;

      const value = keyProvider
        .getWeb3()
        .utils.fromWei(lastLockedFundsEvent?.returnValues?.amount);

      if (!value) return;

      const amount = new BigNumber(value);
      const shouldIssueToken = await service.shouldIssueToken(address);

      if (shouldIssueToken) {
        setHasLoginStep(true);
        handleSetAmount(amount);
      }
    };

    if (isWalletConnected) checkAmountAndSetTokenIssuanceStep();
  }, [
    hasLoginStep,
    lastLockedFundsEvent,
    handleSetAmount,
    isWalletConnected,
    credentials,
    workerTokenData,
  ]);

  return {
    hasLoginStep,
    loading,
  };
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

  const initialValues = useMemo(
    () =>
      isTopUpInProcess
        ? {
            [AmountInputField.amount]: new BigNumber(
              transaction?.amount ?? 0,
            ).toString(10),
          }
        : defaultInitialValues,
    [transaction?.amount, isTopUpInProcess, defaultInitialValues],
  );

  return { transaction, isTopUpInProcess, initialValues };
};

export const useOnTopUpSubmit = (
  confirmedEmail?: string,
  pendingEmail?: string,
) => {
  const [showEmailBanner, setShowEmailBanner] = useState(false);

  const dispatch = useDispatch();
  const { handleSetAmount } = useTopUp();

  const onSuccess = useCallback(() => {
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
      }
    },
    [handleSetAmount, confirmedEmail, onSuccess, pendingEmail],
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
