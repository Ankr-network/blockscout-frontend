import { Error } from 'modules/notifications/components/Error';

import { useErrorStateStyles } from './useErrorStateStyles';

export const ErrorState = () => {
  const { classes } = useErrorStateStyles();

  return (
    <div className={classes.root}>
      <Error />
    </div>
  );
};
