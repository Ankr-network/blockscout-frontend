import { Typography } from '@mui/material';

import { Dialog, IDialogProps } from 'uiKit/Dialog';

import { ActionButton } from './components/ActionButton';
import { Header } from './components/Header';
import { ICommonNotificationData } from './types';
import { useNotificationDialogStyles } from './useNotificationDialogStyles';

export interface INotificationDialogProps
  extends ICommonNotificationData,
    Omit<IDialogProps, 'title'> {}

export const NotificationDialog = ({
  category,
  message,
  timestamp,
  title,
  ...dialogProps
}: INotificationDialogProps) => {
  const { classes } = useNotificationDialogStyles();

  return (
    <Dialog
      classes={classes}
      title={<Header category={category} timestamp={timestamp} title={title} />}
      {...dialogProps}
    >
      <div className={classes.content}>
        <Typography color="textPrimary" variant="body2">
          {message}
        </Typography>
        <ActionButton category={category} />
      </div>
    </Dialog>
  );
};
