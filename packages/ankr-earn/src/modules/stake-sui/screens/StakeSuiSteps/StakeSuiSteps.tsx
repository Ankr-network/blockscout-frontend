import { t } from '@ankr.com/common';

import { ProgressStep } from 'modules/common/components/ProgressStep';
import { Token } from 'modules/common/types/token';

import { useStakeSuiStepsHook } from './useStakeSuiStepsHook';

const SYNTH_TOKEN = Token.aSUIc;

export const StakeSuiSteps = (): JSX.Element => {
  const {
    isLoading,
    isPending,
    amount,
    destination,
    error,
    transactionId,
    handleAddTokenToWallet,
  } = useStakeSuiStepsHook();

  return (
    <ProgressStep
      amount={amount}
      buttonTitle={t('stake.buttons.addToWallet', { token: SYNTH_TOKEN })}
      destinationAddress={destination}
      // TODO: need to double check and test it
      error={error as unknown as Error}
      hint={t('stake.pending.description', { token: SYNTH_TOKEN })}
      isLoading={isLoading}
      isPending={isPending}
      symbol={SYNTH_TOKEN}
      title={t('stake.progressTitle')}
      txHash={transactionId}
      onAddTokenToWallet={handleAddTokenToWallet}
    />
  );
};
