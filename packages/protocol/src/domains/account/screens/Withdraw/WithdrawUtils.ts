import { useState, useMemo } from 'react';
import { useHistory } from 'react-router';

import { t } from 'modules/i18n/utils/intl';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { WithdrawStep } from 'domains/account/actions/withdraw/const';
import { useWithdraw } from 'domains/account/hooks/useWithdraw';

export const useWithdrawBreadcrumbs = () => {
  useSetBreadcrumbs([
    {
      title: t(AccountRoutesConfig.accountDetails.breadcrumbs),
      link: AccountRoutesConfig.accountDetails.generatePath(),
    },
    {
      title: t(AccountRoutesConfig.withdraw.breadcrumbs),
    },
  ]);
};

export const useWithdrawSteps = (initialStep: WithdrawStep) => {
  const [step, setStep] = useState<WithdrawStep>(initialStep);

  const {
    handleWithdraw,
    handleWaitTransactionConfirming,
    handleCheckWithdrawStatus,
    handleResetWithdraw,
    amount,
    loading,
    hasError,
  } = useWithdraw();

  const history = useHistory();

  const onConfirm = useMemo(() => {
    switch (step) {
      case WithdrawStep.start:
        return async () => {
          // move to withdraw
          setStep(oldStep => ++oldStep);
        };

      case WithdrawStep.withdraw: {
        return async () => {
          const { error } = await handleWithdraw();

          if (!error) {
            // move to waitTransactionConfirming
            setStep(oldStep => ++oldStep);

            await handleWaitTransactionConfirming();
          }
        };
      }

      case WithdrawStep.waitTransactionConfirming: {
        return async () => {
          if (hasError) {
            handleResetWithdraw();
          } else {
            // move to done
            setStep(oldStep => ++oldStep);

            handleCheckWithdrawStatus();
          }
        };
      }

      case WithdrawStep.done:
      default:
        return async () => {
          const link = AccountRoutesConfig.accountDetails.generatePath();

          history.push(link);
        };
    }
  }, [
    step,
    handleWithdraw,
    handleWaitTransactionConfirming,
    handleCheckWithdrawStatus,
    history,
    hasError,
    handleResetWithdraw,
  ]);

  return {
    step,
    loading,
    amount: amount?.toNumber(),
    onConfirm,
    hasError,
  };
};
