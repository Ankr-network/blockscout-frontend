import { Theme, makeStyles } from '@material-ui/core';

export const useWSEndpointsStyles = makeStyles<Theme>(theme => ({
  wsEndpoints: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.75),
  },
}));
