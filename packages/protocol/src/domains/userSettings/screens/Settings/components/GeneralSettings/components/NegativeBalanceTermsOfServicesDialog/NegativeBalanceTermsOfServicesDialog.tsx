import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';
import { FailedContent } from 'domains/jwtToken/components/ProjectDialogContent/FailedContent';
import { jwtTokenIntlRoot } from 'domains/jwtToken/utils/utils';

import {
  DialogView,
  useNegativeBalanceTermsOfServicesDialog,
} from './hooks/useNegativeBalanceTermsOfServicesDialog';
import { DefaultContent } from './DefaultContent';

export const NegativeBalanceTermsOfServicesDialog = () => {
  const {
    isOpened,
    dialogView,
    isAcceptLoading,
    handleTryAgain,
    handleCloseFailedDialog,
  } = useNegativeBalanceTermsOfServicesDialog();

  const isFailed = dialogView === DialogView.failed;

  return (
    <Dialog
      open={isOpened}
      maxPxWidth={600}
      shouldHideCloseButton
      canCloseDialogByClickOutside={false}
      title={isFailed && t(`${jwtTokenIntlRoot}.failed.title`)}
    >
      {isFailed ? (
        <FailedContent
          isLoading={isAcceptLoading}
          onClose={handleCloseFailedDialog}
          onTryAgain={handleTryAgain}
        />
      ) : (
        <DefaultContent handleClose={handleTryAgain} />
      )}
    </Dialog>
  );
};
