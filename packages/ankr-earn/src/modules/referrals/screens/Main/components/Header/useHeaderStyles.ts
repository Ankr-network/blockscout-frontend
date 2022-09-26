import { makeStyles } from '@material-ui/core';

export const useHeaderStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gap: theme.spacing(2.5, 3),
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr auto',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
  },

  title: {
    marginBottom: theme.spacing(3),
  },

  refCode: {
    fontSize: 20,
    fontWeight: 500,
    marginRight: theme.spacing(1),
  },

  codeWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  iconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    height: 36,
    width: 36,
  },

  icon: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    fill: 'transparent',
  },
}));
