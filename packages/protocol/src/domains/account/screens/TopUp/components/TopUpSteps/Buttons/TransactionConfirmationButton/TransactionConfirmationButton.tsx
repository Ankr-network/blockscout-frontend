import { CONFIRMATION_BLOCKS } from 'multirpc-sdk';
import { fetchTransactionConfirmationStatus } from 'domains/account/actions/topUp/fetchTransactionConfirmationStatus';
import { t } from 'modules/i18n/utils/intl';
import { LoadingButton } from 'uiKit/LoadingButton';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { getBlockCount } from './TransactionConfirmationButtonUtils';
import { TopUpStep } from 'domains/account/actions/topUp/const';

interface TransactionConfirmationButtonProps {
  className?: string;
}

export const TransactionConfirmationButton = ({
  className,
}: TransactionConfirmationButtonProps) => {
  return (
    <Queries<ResponseData<typeof fetchTransactionConfirmationStatus>>
      requestActions={[fetchTransactionConfirmationStatus]}
      isPreloadDisabled
    >
      {({ data, pristine }) => {
        return (
          <LoadingButton className={className} disabled loading>
            {pristine
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
