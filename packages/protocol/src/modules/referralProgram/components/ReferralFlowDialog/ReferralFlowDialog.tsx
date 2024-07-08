import { Dialog, IDialogProps } from 'uiKit/Dialog';

import { useReferralFlowDialogStyles } from './useReferralFlowDialogStyles';

export interface IReferralFlowDialogProps
  extends Omit<IDialogProps, 'onClose'> {
  banner: string | undefined;
  onClose: () => void;
}

export const ReferralFlowDialog = ({
  banner,
  children,
  ...dialogProps
}: IReferralFlowDialogProps) => {
  const { classes } = useReferralFlowDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      classes={classes}
      closeButtonClassName={classes.closeButton}
      title={
        banner && (
          <img alt="Top banner" className={classes.topBanner} src={banner} />
        )
      }
      titleClassName={classes.dialogTitle}
    >
      <div className={classes.content}>{children}</div>
    </Dialog>
  );
};
