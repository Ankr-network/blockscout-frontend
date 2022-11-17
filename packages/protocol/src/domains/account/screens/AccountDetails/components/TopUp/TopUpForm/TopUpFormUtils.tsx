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
import { ANKR_CURRENCY } from '../../const';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { RateBlock } from './RateBlock';
import { RequestsBlock } from './RequestsBlock';
import { MIN_ANKR_AMOUNT } from 'domains/pricing/screens/Pricing/components/PremiumBlock/PricingTopUp/PricingTopUpUtils';

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
  isAccountPage?: boolean,
  isPricingPage?: boolean,
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
          {isAccountPage && (
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
    ],
  );
};

export const useCheckLoginStep = () => {
  const { data: lastLockedFundsEvent, loading } = useQuery<MessageEventData>({
    type: getLastLockedFundsEvent.toString(),
  });

  const { credentials } = useAuth();
  const { handleSetAmount } = useTopUp();

  const dispatchRequest = useDispatchRequest();
  const [hasLoginStep, setHasLoginStep] = useState<boolean>(false);

  useOnMount(() => {
    dispatchRequest(getLastLockedFundsEvent());
  });

  useEffect(() => {
    const checkAmount = async () => {
      const service = await MultiService.getInstance();
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
        !credentials.endpoint_token &&
        amount.isGreaterThanOrEqualTo(MIN_ANKR_AMOUNT);

      if (isFirstTopup || isTopupAfterTokenExpiration) {
        setHasLoginStep(true);
        handleSetAmount(amount);
      }
    };

    checkAmount();
  }, [credentials, lastLockedFundsEvent, handleSetAmount]);

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
