import { Button } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { createContext, useCallback, useEffect, useMemo } from 'react';
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
import {
  AmountInputField,
  ITopUpFormContext,
  TopUpFormValues,
} from './TopUpFormTypes';
import { getLastLockedFundsEvent } from 'domains/account/actions/topUp/getLastLockedFundsEvent';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { MultiService } from 'modules/api/MultiService';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { ANKR_CURRENCY } from '../../const';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { RateBlock } from './RateBlock';

export const useRenderDisabledForm = (
  classes: ClassNameMap,
  hasRateBlock?: boolean,
) => {
  const isMobile = useIsSMDown();

  return useCallback(
    ({ values }: FormRenderProps<TopUpFormValues>) => {
      return (
        <form autoComplete="off" className={classes.form}>
          <AmountField
            name={AmountInputField.amount}
            isDisabled
            currency={ANKR_CURRENCY}
          />
          {hasRateBlock && (
            <RateBlock value={values[AmountInputField.amount]} />
          )}
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
    [classes.button, classes.form, isMobile, hasRateBlock],
  );
};

const MAX_DECIMALS = 1;

export const useRenderForm = (
  classes: ClassNameMap,
  validateAmount?: any,
  hasRateBlock?: boolean,
  balance?: BigNumber,
) => {
  return useCallback(
    ({
      handleSubmit,
      validating,
      form: { change },
      values,
    }: FormRenderProps<TopUpFormValues>) => {
      change('balance', balance);

      return (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <AmountField
            name={AmountInputField.amount}
            change={change}
            maxDecimals={MAX_DECIMALS}
            currency={ANKR_CURRENCY}
            validate={validateAmount}
          />
          {hasRateBlock && (
            <RateBlock value={values[AmountInputField.amount]} />
          )}
          <Button
            color="primary"
            fullWidth
            type="submit"
            disabled={validating}
            className={classes.button}
          >
            {t('account.account-details.top-up.button')}
          </Button>
        </form>
      );
    },
    [classes.button, classes.form, validateAmount, hasRateBlock, balance],
  );
};

const actionType = getLastLockedFundsEvent.toString();

export const useCheckLoginStep = () => {
  const { data: lastLockedFundsEvent, loading } = useQuery<MessageEventData>({
    type: actionType,
  });

  const { credentials } = useAuth();
  const { handleSetAmount } = useTopUp();

  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(getLastLockedFundsEvent());
  });

  const hasLoginStep = Boolean(lastLockedFundsEvent) && !credentials;

  useEffect(() => {
    if (!hasLoginStep) return;

    const checkAmount = async () => {
      const service = await MultiService.getInstance();
      const keyProvider = service.getKeyProvider();

      const value = keyProvider
        .getWeb3()
        .utils.fromWei(lastLockedFundsEvent?.returnValues?.amount);

      if (!value) return;

      handleSetAmount(new BigNumber(value));
    };

    checkAmount();
  }, [hasLoginStep, lastLockedFundsEvent, handleSetAmount]);

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

export const useOnTopUpSubmit = () => {
  const dispatch = useDispatch();
  const { handleSetAmount } = useTopUp();

  const onSubmit = useCallback(
    (data: TopUpFormValues) => {
      handleSetAmount(new BigNumber(data.amount));
      dispatch(push(AccountRoutesConfig.topUp.generatePath()));
    },
    [dispatch, handleSetAmount],
  );

  return onSubmit;
};

export const DEFAULT_CONTEXT_VALUES: ITopUpFormContext = {
  initialValues: { amount: '' },
  hasRateBlock: true,
};

export const TopUpFormContext = createContext<ITopUpFormContext>(
  DEFAULT_CONTEXT_VALUES,
);
