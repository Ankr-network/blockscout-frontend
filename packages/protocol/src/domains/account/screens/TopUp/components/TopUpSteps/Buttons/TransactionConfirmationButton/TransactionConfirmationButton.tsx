import { CONFIRMATION_BLOCKS, IIssueJwtTokenResult } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useEffect } from 'react';

import { LoadingButton } from 'uiKit/LoadingButton';
import { Queries } from 'modules/common/components/Queries/Queries';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { topUpFetchTransactionConfirmationStatus } from 'domains/account/actions/topUp/fetchTransactionConfirmationStatus';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { getBlockCount } from './TransactionConfirmationButtonUtils';

interface TransactionConfirmationButtonProps {
  className?: string;
}

export const TransactionConfirmationButton = ({
  className,
}: TransactionConfirmationButtonProps) => {
  const [, state, reset] = useQueryEndpoint(
    topUpFetchTransactionConfirmationStatus,
  );

  useEffect(() => reset, [reset]);

  return (
    <Queries<IIssueJwtTokenResult> queryStates={[state]} isPreloadDisabled>
      {({ data, isUninitialized }) => {
        return (
          <LoadingButton className={className} disabled loading>
            {isUninitialized
              ? t(
                  `top-up-steps.button.${TopUpStep.waitTransactionConfirming}-loading`,
                )
              : t('top-up-steps.transaction-confirmation-button', {
                  block: getBlockCount(data?.remainingBlocks),
                  totalBlocks: CONFIRMATION_BLOCKS,
                })}
          </LoadingButton>
        );
      }}
    </Queries>
  );
};
