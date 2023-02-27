import { makeStyles } from '@material-ui/core';

export const useUpgradeInfoStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2, 4),
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3, 5, 5),
    },
  },

  imgWrap: {
    position: 'relative',
    maxWidth: 154,
    margin: theme.spacing(0, 'auto', 2),

    '&:before': {
      content: `''`,
      display: 'block',
      paddingTop: '100%',
    },
  },

  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  title: {
    letterSpacing: '-0.04em',
    marginBottom: theme.spacing(1.5),

    [theme.breakpoints.up('sm')]: {
      fontSize: 35,
    },
  },

  description: {
    maxWidth: 410,
    margin: theme.spacing(0, 'auto', 3),
    fontWeight: 400,
  },

  info: {
    position: 'relative',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2, 2, 2, 6.25),

    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 16,
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 400,
  },

  infoIcon: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    width: '1em',
    height: '1em',

    fontSize: 24,
  },
}));
