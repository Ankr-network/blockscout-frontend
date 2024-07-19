import { Dialog } from 'uiKit/Dialog';
import { useWindowHeight } from 'hooks/useWindowHeight';

import { ContentType } from './types';
import { useUpgradePlanDialogState } from './hooks/useUpgradePlanDialogState';
import { useUpgradePlanDialogStyles } from './useUpgradePlanDialogStyles';

export interface IUpgradePlanDialogProps {
  defaultState: ContentType;
  onClose: () => void;
  open: boolean;
}

export const UpgradePlanDialog = ({
  defaultState,
  onClose,
  open,
}: IUpgradePlanDialogProps) => {
  const { dialogProps, isContactSalesPopup } = useUpgradePlanDialogState({
    defaultState,
    onClose,
  });

  const windowHeight = useWindowHeight();
  const { classes, cx } = useUpgradePlanDialogStyles({ windowHeight });

  return (
    <Dialog
      className={classes.root}
      maxPxWidth={620}
      classes={{
        container: classes.dialogContainer,
      }}
      open={open}
      paperClassName={cx(classes.paperRoot, {
        [classes.dialogContainerWhite]: isContactSalesPopup,
      })}
      titleClassName={cx(classes.title, {
        [classes.dialogTitleBlack]: isContactSalesPopup,
      })}
      keepMounted
      {...dialogProps}
    />
  );
};
