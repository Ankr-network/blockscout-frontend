import { ReactNode } from 'react';

import { Dialog, IDialogProps } from 'uiKit/Dialog';

import { useReferralFlowDialogStyles } from './useReferralFlowDialogStyles';

export interface IReferralFlowDialogProps
  extends Omit<IDialogProps, 'onClose'> {
  banner: string | undefined;
  onClose: () => void;
  title?: ReactNode;
}

export const ReferralFlowDialog = ({
  banner,
  children,
  title: externalTitle,
  ...dialogProps
}: IReferralFlowDialogProps) => {
  const { classes } = useReferralFlowDialogStyles();

  const title =
    externalTitle ||
    (banner && (
      <img
        alt="Top banner"
        className={classes.topBanner}
        height="280"
        src={banner}
      />
    ));

  return (
    <Dialog
      {...dialogProps}
      classes={classes}
      closeButtonClassName={classes.closeButton}
      title={title}
      titleClassName={classes.dialogTitle}
    >
      <div className={classes.content}>{children}</div>
    </Dialog>
  );
};
