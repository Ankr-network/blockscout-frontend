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
    color: theme.palette.text.secondary,
  },

  greenDot: {
    height: 8,
    width: 8,
    backgroundColor: theme.palette.success.main,
    borderRadius: '50%',
    display: 'inline-block',
  },

  redDot: {
    height: 8,
    width: 8,
    backgroundColor: theme.palette.error.main,
    borderRadius: '50%',
    display: 'inline-block',
  },
}));
