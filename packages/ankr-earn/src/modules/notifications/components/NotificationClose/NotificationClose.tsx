import { IconButton } from '@material-ui/core';

import { CloseIcon } from 'uiKit/Icons/CloseIcon';

import { useNotificationCloseStyles } from './useNotificationCloseStyles';

interface INotificationCloseProps {
  onClick?: () => void;
}

export const NotificationClose = ({
  onClick,
}: INotificationCloseProps): JSX.Element => {
  const classes = useNotificationCloseStyles();

  return (
    <IconButton className={classes.root} onClick={onClick}>
      <CloseIcon htmlColor="inherit" size="xxs" />
    </IconButton>
  );
};
