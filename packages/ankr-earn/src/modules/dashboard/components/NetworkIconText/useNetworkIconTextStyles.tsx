import { makeStyles, Theme } from '@material-ui/core';

export const useNetworkIconTextStyles = makeStyles<Theme>(theme => ({
  icon: {
    fontSize: 40,
    display: 'block',
  },

  iconSkeleton: {
    width: '1em',
    height: '1em',
    borderRadius: 5,
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

  btnSkeleton: {
    borderRadius: 12,
  },

  copied: {
    width: 168,
    padding: 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    color: theme.palette.text.secondary,
  },
}));
