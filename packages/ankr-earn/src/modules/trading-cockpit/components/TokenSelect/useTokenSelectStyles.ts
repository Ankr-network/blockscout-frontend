import { makeStyles, Theme } from '@material-ui/core';

export const useTokenSelectStyles = makeStyles<Theme>(theme => ({
  select: {
    borderRadius: 12,
  },

  selectRoot: {
    '&&': {
      padding: 0,
    },
  },

  selectBtn: {
    display: 'flex',
    alignItems: 'center',
    height: 56,
    minWidth: 150,
    padding: theme.spacing(1, 5, 1, 2.5),
    boxSizing: 'border-box',
  },

  tokenIcon: {
    marginLeft: 0,
    marginRight: theme.spacing(1.5),
    fontSize: 32,

    '& > *:first-child': {
      fontSize: 'inherit',
    },
  },

  menuItem: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.spacing(0, 2),
    alignItems: 'center',

    '&:first-child': {
      marginTop: theme.spacing(1),
    },

    '&:last-child': {
      marginBottom: theme.spacing(1),
    },
  },

  listItemIcon: {
    display: 'flex',
  },
}));
