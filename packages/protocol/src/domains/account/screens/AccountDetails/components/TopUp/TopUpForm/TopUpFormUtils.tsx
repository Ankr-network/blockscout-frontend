import { Button } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { useCallback, useEffect } from 'react';
import { FormRenderProps } from 'react-final-form';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { t } from 'modules/i18n/utils/intl';
import { NavLink, useIsSMDown } from 'ui';
import { AmountField } from './AmountField';
import { AmountInputField, TopUpFormValues } from './TopUpFormTypes';

import { getLastLockedFundsEvent } from 'domains/account/actions/topUp/getLastLockedFundsEvent';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { MessageEventData } from 'provider';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { MultiService } from 'modules/api/MultiService';
import { useAppSelector } from 'store/useAppSelector';
import { selectTransaction } from 'domains/account/store/accountTopUpSlice';

export const useRenderDisabledForm = (classes: ClassNameMap) => {
  const isMobile = useIsSMDown();

  return useCallback(() => {
    return (
      <form autoComplete="off" className={classes.form}>
        <AmountField name={AmountInputField.amount} isDisabled />
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
  }, [classes.button, classes.form, isMobile]);
};

const MAX_DECIMALS = 1;

export const useRenderForm = (classes: ClassNameMap) => {
  return useCallback(
    ({
      handleSubmit,
      validating,
      form: { change },
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
            maxDecimals={MAX_DECIMALS}
          />
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
    [classes.button, classes.form],
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

  const handleCheckLockedFunds = useCallback(() => {
    dispatchRequest(getLastLockedFundsEvent());
  }, [dispatchRequest]);

  const hasLoginStep = Boolean(lastLockedFundsEvent) && !credentials;

  useEffect(() => {
    if (!hasLoginStep) return;

    const { service } = MultiService.getInstance();
    const keyProvider = service.getKeyProvider();

    const value = keyProvider
      .getWeb3()
      .utils.fromWei(lastLockedFundsEvent?.returnValues?.amount);

    if (!value) return;

    handleSetAmount(new BigNumber(value));
  }, [hasLoginStep, lastLockedFundsEvent, handleSetAmount]);

  return {
    handleCheckLockedFunds,
    hasLoginStep,
    loading,
  };
};

export const useCheckBrokenTransaction = () => {
  const transaction = useAppSelector(selectTransaction);
  const { handleResetTopUpTransaction } = useTopUp();

  const isAmountEmpty =
    !transaction?.amount || transaction?.amount?.toString() === '0';

  if (
    isAmountEmpty &&
    (transaction?.allowanceTransactionHash || transaction?.topUpTransactionHash)
  ) {
    handleResetTopUpTransaction();
  }
};
