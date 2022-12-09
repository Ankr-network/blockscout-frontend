import { makeStyles } from '@material-ui/core';

export const useNotificationStyles = makeStyles(() => ({
  root: {
    '& a': {
      textDecoration: 'underline',
    },
  },
}));
