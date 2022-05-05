import { useMemo, useState } from 'react';
import { useHistory } from 'react-router';

import { t } from 'modules/i18n/utils/intl';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { TopUpStep } from 'domains/account/actions/topUp/const';

export const useTopUpBreadcrumbs = () => {
  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.accountDetails.breadcrumbs),
      link: AccountRoutesConfig.accountDetails.generatePath(),
    },
    {
      title: t(AccountRoutesConfig.topUp.breadcrumbs),
    },
  ]);
};

export const useTopupSteps = (initialStep: TopUpStep) => {
  const [step, setStep] = useState<TopUpStep>(initialStep);

  const {
    handleGetAllowance,
    handleDeposit,
    handleRejectAllowance,
    handleWaitTransactionConfirming,
    handleRedirectIfCredentials,
    handleLogin,
    amount,
    loading,
    isRejectAllowanceLoading,
  } = useTopUp();

  const history = useHistory();

  const onConfirm = useMemo(() => {
    switch (step) {
      case TopUpStep.start:
        return async () => {
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
          const { error, data } = await handleDeposit();

          if (!error) {
            // move to waitTransactionConfirming
            setStep(oldStep => ++oldStep);

            await handleWaitTransactionConfirming(data?.receiptPromise);
          }
        };
      }

      case TopUpStep.waitTransactionConfirming: {
        return async () => {
          const { data: hasRedirect } = await handleRedirectIfCredentials();

          if (!hasRedirect) {
            // move to login
            setStep(oldStep => ++oldStep);
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
  ]);

  const onRejectAllowance = useMemo(() => {
    return async () => {
      const { error } = await handleRejectAllowance();

      if (!error) {
        const link = AccountRoutesConfig.accountDetails.generatePath();

        history.push(link);
      }
    };
  }, [history, handleRejectAllowance]);

  return {
    step,
    loading,
    amount: amount?.toNumber(),
    onConfirm,
    onReject: onRejectAllowance,
    isRejectAllowanceLoading,
  };
};
