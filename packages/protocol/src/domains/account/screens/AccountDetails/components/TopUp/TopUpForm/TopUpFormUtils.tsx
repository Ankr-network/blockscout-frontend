import { Button } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
import { RateBlock } from './RateBlock';
import { RequestsBlock } from './RequestsBlock';
import { ConnectButton } from 'domains/auth/components/ConnectButton';
import {
  ANKR_CURRENCY,
  DEFAULT_ANKR_VALUE,
} from 'domains/account/actions/topUp/const';

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
            <RateBlock
              value={values[AmountInputField.amount]}
              currency={ANKR_CURRENCY}
            />
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

interface RenderFormParams {
  classes: ClassNameMap;
  validateAmount?: any;
  isAccountPage?: boolean;
  isPricingPage?: boolean;
  balance?: BigNumber;
  isWalletConnected: boolean;
}

export const useRenderForm = ({
  classes,
  validateAmount,
  isAccountPage,
  isPricingPage,
  balance,
  isWalletConnected,
}: RenderFormParams) => {
  return useCallback(
    ({
      handleSubmit,
      validating,
      form: { change, submit },
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
          {isAccountPage && (
            <RateBlock
              value={values[AmountInputField.amount]}
              currency={ANKR_CURRENCY}
            />
          )}
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
          {isPricingPage && (
            <RequestsBlock value={values[AmountInputField.amount]} />
          )}
        </form>
      );
    },
    [
      classes.button,
      classes.form,
      validateAmount,
      isAccountPage,
      isPricingPage,
      balance,
      isWalletConnected,
    ],
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
    const checkAmount = async () => {
      const service = await MultiService.getWeb3Service();
      const keyProvider = service.getKeyProvider();

      if (!lastLockedFundsEvent) return;

      const value = keyProvider
        .getWeb3()
        .utils.fromWei(lastLockedFundsEvent?.returnValues?.amount);

      if (!value) return;

      const amount = new BigNumber(value);

      const isFirstTopup = Boolean(lastLockedFundsEvent) && !credentials;
      const isTopupAfterTokenExpiration =
        Boolean(lastLockedFundsEvent) &&
        credentials &&
        !workerTokenData?.userEndpointToken &&
        amount.isGreaterThanOrEqualTo(DEFAULT_ANKR_VALUE);

      if (isFirstTopup || isTopupAfterTokenExpiration) {
        setHasLoginStep(true);
        handleSetAmount(amount);
      }
    };

    if (isWalletConnected) checkAmount();
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
  isAccountPage: boolean,
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

  const isPricingPage = !isAccountPage;

  const onSubmit = useCallback(
    (data: TopUpFormValues) => {
      handleSetAmount(new BigNumber(data.amount));

      if (isPricingPage && (!confirmedEmail || pendingEmail)) {
        setShowEmailBanner(true);
      } else {
        onSuccess();
      }
    },
    [handleSetAmount, confirmedEmail, onSuccess, pendingEmail, isPricingPage],
  );

  return { onSubmit, isOpened: showEmailBanner, onClose };
};

export const DEFAULT_CONTEXT_VALUES: ITopUpFormContext = {
  initialValues: { amount: '' },
  isAccountPage: true,
};

export const TopUpFormContext = createContext<ITopUpFormContext>(
  DEFAULT_CONTEXT_VALUES,
);
