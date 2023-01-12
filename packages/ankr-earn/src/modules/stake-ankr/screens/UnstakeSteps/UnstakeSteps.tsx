import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';

import { UnstakeStepsSuccessHint } from './UnstakeStepsSuccessHint';
import { useUnstakeStepsHook } from './useUnstakeStepsHook';

export const UnstakeSteps = (): JSX.Element => {
  const { isLoading, isPending, amount, error, nodeProvider, transactionId } =
    useUnstakeStepsHook();

  return (
    <ProgressStep
      amount={amount}
      error={error as unknown as Error}
      isLoading={isLoading}
      isPending={isPending}
      nodeProvider={nodeProvider}
      pendingHint={t('stake-ankr.unstaking.description')}
      successHint={<UnstakeStepsSuccessHint />}
      symbol={t('unit.ankr')}
      title={t('stake-ankr.unstaking.progress-title')}
      txHash={transactionId}
    />
  );
};
