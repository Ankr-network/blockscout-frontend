import { Theme, makeStyles } from '@material-ui/core';

export const useRPCEndpointsStyles = makeStyles<Theme>(theme => ({
  rpcEndpoints: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.75),
  },
}));
