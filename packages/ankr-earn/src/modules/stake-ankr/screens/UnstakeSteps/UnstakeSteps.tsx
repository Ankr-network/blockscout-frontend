import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';

import { useUnstakeStepsHook } from './useUnstakeStepsHook';

export const UnstakeSteps = (): JSX.Element => {
  const { isLoading, isPending, amount, error, nodeProvider, transactionId } =
    useUnstakeStepsHook();

  return (
    <ProgressStep
      amount={amount}
      error={error as unknown as Error}
      hint={t('stake-ankr.unstaking.description')}
      isLoading={isLoading}
      isPending={isPending}
      nodeProvider={nodeProvider}
      symbol={t('unit.ankr')}
      title={t('stake-ankr.unstaking.progress-title')}
      txHash={transactionId}
    />
  );
};
