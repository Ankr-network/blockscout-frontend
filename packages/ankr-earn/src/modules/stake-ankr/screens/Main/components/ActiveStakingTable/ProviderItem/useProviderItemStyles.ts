import { makeStyles, Theme } from '@material-ui/core';

export const useProviderItemStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: theme.palette.text.primary,
  },

  infoWrapper: {
    marginLeft: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  nodeAmount: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
}));
