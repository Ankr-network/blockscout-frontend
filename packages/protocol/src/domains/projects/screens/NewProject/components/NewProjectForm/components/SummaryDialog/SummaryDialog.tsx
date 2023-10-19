import { tHTML } from '@ankr.com/common';
import { useMemo } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';

import { Dialog } from 'uiKit/Dialog';
import { projectsIntlRoot } from 'domains/projects/const';
import { WhitelistInfoCard } from 'domains/account/screens/CardPaymentSuccess/components/WhitelistInfoCard';

import { useUserEndpointDialogStyles } from './useSummaryDialogStyles';
import { SummaryContent } from './components/SummaryContent';

interface SummaryDialogProps {
  isOpened: boolean;
  onClose: () => void;
  isLoading: boolean;
  isSuccess: boolean;
}

export const SummaryDialog = ({
  isOpened,
  onClose,
  isLoading,
  isSuccess,
}: SummaryDialogProps) => {
  const { classes } = useUserEndpointDialogStyles();

  const isSuccessCard = isSuccess && !isLoading;

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className={classes.spinnerWrapper}>
          <OverlaySpinner />
        </div>
      );
    }

    if (isSuccessCard) {
      return <WhitelistInfoCard className={classes.infoCard} />;
    }

    return <SummaryContent onClose={onClose} />;
  }, [
    isSuccessCard,
    isLoading,
    classes.spinnerWrapper,
    classes.infoCard,
    onClose,
  ]);

  return (
    <Dialog
      maxPxWidth={600}
      fullWidth
      open={isOpened}
      onClose={onClose}
      title={isSuccessCard ? '' : tHTML(`${projectsIntlRoot}.summary.title`)}
      titleClassName={classes.title}
      shouldHideCloseButton
      canCloseDialogByClickOutside={false}
    >
      {content}
    </Dialog>
  );
};
