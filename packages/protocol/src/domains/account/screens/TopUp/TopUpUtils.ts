import { useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import BigNumber from 'bignumber.js';

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
    handleFetchPublicKey,
    handleGetAllowance,
    handleDeposit,
    handleWaitTransactionConfirming,
    handleFetchPublicKeyAgain,
    handleLogin,
    handleResetTopUpTransaction,
    handleSetAmount,

    amount,
    loading,
    hasError,
  } = useTopUp();

  const history = useHistory();

  const onClick = useMemo(() => {
    switch (step) {
      case TopUpStep.start:
        return async () => {
          // move to allowance
          setStep(oldStep => ++oldStep);
        };

      case TopUpStep.allowance: {
        return async () => {
          await handleGetAllowance();
          // move to publicKey
          setStep(oldStep => ++oldStep);
        };
      }

      case TopUpStep.publicKey: {
        return async () => {
          await handleFetchPublicKey();
          // move to deposit
          setStep(oldStep => ++oldStep);
        };
      }

      case TopUpStep.deposit: {
        return async () => {
          await handleDeposit();

          // move to waitTransactionConfirming
          setStep(oldStep => ++oldStep);

          await handleWaitTransactionConfirming();
        };
      }

      // we need this step if user reload the page on waitTransactionConfirming
      case TopUpStep.waitTransactionConfirming: {
        return async () => {
          // move to done
          setStep(oldStep => ++oldStep);

          await handleResetTopUpTransaction();
        };
      }

      // we need this step if user reload the page on done
      case TopUpStep.done: {
        return async () => {
          await handleResetTopUpTransaction();

          await handleFetchPublicKeyAgain();

          setStep(oldStep => ++oldStep);
        };
      }

      case TopUpStep.login:
      default:
        return async () => {
          await handleSetAmount(new BigNumber(0));

          await handleLogin().then(() => {
            const link = AccountRoutesConfig.accountDetails.generatePath();

            history.push(link);
          });
        };
    }
  }, [
    step,
    handleFetchPublicKey,
    handleGetAllowance,
    handleDeposit,
    handleWaitTransactionConfirming,
    handleFetchPublicKeyAgain,
    handleLogin,
    handleResetTopUpTransaction,
    history,
    handleSetAmount,
  ]);

  return {
    step,
    loading,
    hasError,
    amount: amount?.toNumber(),

    onClick,
  };
};
