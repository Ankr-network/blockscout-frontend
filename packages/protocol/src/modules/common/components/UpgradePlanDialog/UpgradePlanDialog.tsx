import { ContentType, UpgradePlanDialogType } from './types';
import { Dialog } from 'uiKit/Dialog';
import { useUpgradePlanDialogState } from './hooks/useUpgradePlanDialogState';
import { useUpgradePlanDialogStyles } from './UpgradePlanDialogStyles';
import { useWindowHeight } from 'hooks/useWindowHeight';

export interface UpgradePlanDialogProps {
  defaultState?: ContentType;
  onClose: () => void;
  open: boolean;
  type?: UpgradePlanDialogType;
}

export const UpgradePlanDialog = ({
  defaultState,
  onClose,
  open,
  type = UpgradePlanDialogType.Default,
}: UpgradePlanDialogProps) => {
  const { dialogProps, isContactSalesPopup } = useUpgradePlanDialogState({
    defaultState,
    onClose,
    type,
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
      titleClassName={classes.title}
      {...dialogProps}
    />
  );
};
