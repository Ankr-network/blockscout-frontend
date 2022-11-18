import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';

import { useClaimStepsHook } from './useClaimStepsHook';

export const ClaimSteps = (): JSX.Element => {
  const { isLoading, isPending, error, nodeProvider, transactionId } =
    useClaimStepsHook();

  return (
    <ProgressStep
      error={error as unknown as Error}
      hint={t('stake-ankr.claim.description')}
      isLoading={isLoading}
      isPending={isPending}
      nodeProvider={nodeProvider}
      symbol={t('unit.ankr')}
      title={t('stake-ankr.claim.progress-title')}
      txHash={transactionId}
    />
  );
};
