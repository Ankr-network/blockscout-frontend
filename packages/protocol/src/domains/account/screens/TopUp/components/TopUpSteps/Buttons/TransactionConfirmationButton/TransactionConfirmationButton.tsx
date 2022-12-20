import { CONFIRMATION_BLOCKS, IIssueJwtTokenResult } from 'multirpc-sdk';

import { LoadingButton } from 'uiKit/LoadingButton';
import { Queries } from 'modules/common/components/Queries/Queries';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { getBlockCount } from './TransactionConfirmationButtonUtils';
import { t } from 'modules/i18n/utils/intl';
import { topUpFetchTransactionConfirmationStatus } from 'domains/account/actions/topUp/fetchTransactionConfirmationStatus';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

interface TransactionConfirmationButtonProps {
  className?: string;
}

export const TransactionConfirmationButton = ({
  className,
}: TransactionConfirmationButtonProps) => {
  const [, state, reset] = useQueryEndpoint(
    topUpFetchTransactionConfirmationStatus,
  );

  useOnMount(reset);

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
