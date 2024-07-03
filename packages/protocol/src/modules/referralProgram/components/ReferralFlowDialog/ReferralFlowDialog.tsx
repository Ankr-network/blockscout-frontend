import { Dialog, IDialogProps } from 'uiKit/Dialog';

import { topBannersMap } from './const';
import { useReferralFlowDialogStyles } from './useReferralFlowDialogStyles';

export interface IReferralFlowDialogProps
  extends Omit<IDialogProps, 'onClose'> {
  onClose: () => void;
  referralCode: string | undefined;
}

export const ReferralFlowDialog = ({
  children,
  referralCode,
  ...dialogProps
}: IReferralFlowDialogProps) => {
  const bannerSrc = referralCode ? topBannersMap[referralCode] : undefined;

  const { classes } = useReferralFlowDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      classes={classes}
      closeButtonClassName={classes.closeButton}
      title={
        bannerSrc && (
          <img alt="Top banner" className={classes.topBanner} src={bannerSrc} />
        )
      }
      titleClassName={classes.dialogTitle}
    >
      <div className={classes.content}>{children}</div>
    </Dialog>
  );
};
