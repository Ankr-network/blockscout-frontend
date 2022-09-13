import { makeStyles, Theme } from '@material-ui/core';

export const useEndpointsStyles = makeStyles<Theme>(theme => ({
  endpointsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.75),

    borderRadius: theme.spacing(3.75),

    backgroundColor: theme.palette.common.white,
  },
}));
