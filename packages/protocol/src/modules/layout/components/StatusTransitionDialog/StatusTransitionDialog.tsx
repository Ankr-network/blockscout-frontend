import { t, tHTML } from '@ankr.com/common';
import { Clock } from '@ankr.com/ui';
import { Button } from '@mui/material';

import { Dialog } from 'uiKit/Dialog';
import { LAYOUT_DIALOG_WIDTH } from 'modules/layout/const';
import { useStatusTransitionDialog } from './hooks/useStatusTransitionDialog';
import { useStatusTransitionDialogStyles } from './StatusTransitionDialogStyles';

const text = (key: string) => t(`status-transition-dialog.${key}`);
const html = (key: string) => tHTML(`status-transition-dialog.${key}`);

export const StatusTransitionDialog = () => {
  const { isOpened, onClose } = useStatusTransitionDialog();
  const { classes } = useStatusTransitionDialogStyles();

  return (
    <Dialog
      maxPxWidth={LAYOUT_DIALOG_WIDTH}
      onClose={onClose}
      open={isOpened}
      paperClassName={classes.paper}
      title={
        <div className={classes.icon}>
          <Clock size="xmd" />
        </div>
      }
      titleClassName={classes.iconWrapper}
    >
      <div className={classes.title}>{text('title')}</div>
      <div className={classes.description}>{html('description')}</div>
      <Button className={classes.button} onClick={onClose}>
        {text('button')}
      </Button>
    </Dialog>
  );
};
