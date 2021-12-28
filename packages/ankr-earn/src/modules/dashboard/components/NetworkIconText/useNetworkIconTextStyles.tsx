import { makeStyles, Theme } from '@material-ui/core';

export const useNetworkIconTextStyles = makeStyles<Theme>(theme => ({
  icon: {
    fontSize: 40,
  },

  token: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1,
    marginBottom: theme.spacing(1),
  },
  network: {
    fontSize: 13,
    color: theme.palette.text.secondary,
    lineHeight: 1,
  },
}));
