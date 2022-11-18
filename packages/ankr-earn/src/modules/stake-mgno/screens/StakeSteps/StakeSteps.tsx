import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';

import { useStakeStepsHook } from './useStakeStepsHook';

export const StakeSteps = (): JSX.Element => {
  const { isLoading, isPending, amount, error, nodeProvider, transactionId } =
    useStakeStepsHook();

  return (
    <ProgressStep
      amount={amount}
      error={error}
      hint={t('stake.pending.description', { token: t('unit.mgno') })}
      isLoading={isLoading}
      isPending={isPending}
      nodeProvider={nodeProvider}
      symbol={t('unit.mgno')}
      title={t('stake.progressTitle')}
      txHash={transactionId}
    />
  );
};
