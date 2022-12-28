import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { t } from 'modules/i18n/utils/intl';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useTopUp } from 'domains/account/hooks/useTopUp';

export const useTopUpBreadcrumbs = (hasPrivateAccess: boolean) => {
  const breadcrumbs = hasPrivateAccess
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
    amount,
    handleDeposit,
    handleGetAllowance,
    handleLogin,
    handleRedirectIfCredentials,
    handleRejectAllowance,
    handleResetDeposit,
    handleWaitTransactionConfirming,
    hasError,
    isRejectAllowanceLoading,
    loading,
    loadingWaitTransactionConfirming,
  } = useTopUp();
  const history = useHistory();

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

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
    handleDeposit,
    handleGetAllowance,
    handleLogin,
    handleRedirectIfCredentials,
    handleResetDeposit,
    handleWaitTransactionConfirming,
    hasError,
    history,
    step,
  ]);

  return {
    amount: amount?.toString(10),
    hasError,
    isRejectAllowanceLoading,
    loading,
    loadingWaitTransactionConfirming,
    onConfirm,
    onReject: handleRejectAllowance,
    step,
  };
};

export const useCheckConfirmedEmail = (
  hasPrivateAccess: boolean,
  isWalletConnected: boolean,
) => {
  const dispatch = useDispatch();

  const {
    confirmedEmail,
    isLoading: emailDataLoading,
    pristine,
  } = useEmailData();

  useEffect(() => {
    if (hasPrivateAccess || !isWalletConnected) return;

    if (!pristine && !emailDataLoading && !confirmedEmail) {
      dispatch(push(AccountRoutesConfig.accountDetails.generatePath()));
    }
  }, [
    confirmedEmail,
    emailDataLoading,
    pristine,
    dispatch,
    hasPrivateAccess,
    isWalletConnected,
  ]);
};
