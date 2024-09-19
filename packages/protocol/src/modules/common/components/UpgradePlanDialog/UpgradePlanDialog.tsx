import { Dialog } from 'uiKit/Dialog';
import { useWindowHeight } from 'hooks/useWindowHeight';
import { NoReactSnap } from 'uiKit/NoReactSnap';

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
  const { dialogProps } = useUpgradePlanDialogState({
    defaultState,
    onClose,
  });

  const windowHeight = useWindowHeight();
  const { classes } = useUpgradePlanDialogStyles({ windowHeight });

  return (
    <NoReactSnap>
      <Dialog
        className={classes.root}
        maxPxWidth={620}
        classes={{
          container: classes.dialogContainer,
        }}
        open={open}
        keepMounted
        {...dialogProps}
      />
    </NoReactSnap>
  );
};
