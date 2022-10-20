import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import { t } from 'modules/i18n/utils/intl';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';

export const useTopUpBreadcrumbs = (hasCredentials: boolean) => {
  const breadcrumbs = hasCredentials
    ? [
        {
          title: t(AccountRoutesConfig.accountDetails.breadcrumbs),
          link: AccountRoutesConfig.accountDetails.generatePath(),
        },
        {
          title: t(AccountRoutesConfig.topUp.breadcrumbs),
        },
      ]
    : [
        {
          title: t(PricingRoutesConfig.pricing.breadcrumbs),
          link: PricingRoutesConfig.pricing.generatePath(),
        },
        {
          title: t(AccountRoutesConfig.topUp.breadcrumbs),
        },
      ];

  useSetBreadcrumbs(breadcrumbs);
};

export const useTopupSteps = (initialStep: TopUpStep) => {
  const [step, setStep] = useState<TopUpStep>(initialStep);

  const {
    handleGetAllowance,
    handleDeposit,
    handleResetDeposit,
    handleRejectAllowance,
    handleWaitTransactionConfirming,
    handleRedirectIfCredentials,
    handleLogin,
    amount,
    loading,
    isRejectAllowanceLoading,
    hasError,
  } = useTopUp();
  const history = useHistory();

  const onConfirm = useMemo(() => {
    switch (step) {
      case TopUpStep.start:
        return () => {
          // move to allowance
          setStep(oldStep => ++oldStep);
        };

      case TopUpStep.allowance: {
        return async () => {
          const { error } = await handleGetAllowance();

          if (!error) {
            // move to deposit
            setStep(oldStep => ++oldStep);
          }
        };
      }

      case TopUpStep.deposit: {
        return async () => {
          const { error } = await handleDeposit();

          if (!error) {
            // move to waitTransactionConfirming
            setStep(oldStep => ++oldStep);

            await handleWaitTransactionConfirming();
          }
        };
      }

      case TopUpStep.waitTransactionConfirming: {
        return async () => {
          if (hasError) {
            handleResetDeposit();
            setStep(oldStep => --oldStep);
          } else {
            const { data: hasRedirect } = await handleRedirectIfCredentials();

            if (!hasRedirect) {
              // move to login
              setStep(oldStep => ++oldStep);
            }
          }
        };
      }

      case TopUpStep.login:
      default:
        return async () => {
          const { error } = await handleLogin();

          if (!error) {
            const link = AccountRoutesConfig.accountDetails.generatePath();

            history.push(link);
          }
        };
    }
  }, [
    step,
    handleGetAllowance,
    handleDeposit,
    handleWaitTransactionConfirming,
    handleLogin,
    history,
    handleRedirectIfCredentials,
    hasError,
    handleResetDeposit,
  ]);

  return {
    step,
    loading,
    amount: amount?.toString(10),
    onConfirm,
    onReject: handleRejectAllowance,
    isRejectAllowanceLoading,
    hasError,
  };
};

export const useCheckConfirmedEmail = (hasCredentials: boolean) => {
  const dispatch = useDispatch();

  const {
    confirmedEmail,
    loading: emailDataLoading,
    pristine,
  } = useEmailData();

  useEffect(() => {
    if (hasCredentials) return;

    if (!pristine && !emailDataLoading && !confirmedEmail) {
      dispatch(push(AccountRoutesConfig.accountDetails.generatePath()));
    }
  }, [confirmedEmail, emailDataLoading, pristine, dispatch, hasCredentials]);
};
