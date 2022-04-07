import { makeStyles } from '@material-ui/core';

export const useSwitchSelectStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
  },

  selectContainer: {
    minWidth: 270,
  },

  select: {
    backgroundColor: theme.palette.background.default,
    border: 'none',
    borderRadius: 18,

    '&:hover, &:active, &:focus': {
      backgroundColor: theme.palette.background.default,
    },
  },

  selectItem: {
    alignItems: 'center',
    display: 'flex',
  },

  symbol: {
    marginLeft: theme.spacing(1),
    fontSize: '0.875rem',
  },

  switchIcon: {
    borderRadius: 12,
    margin: theme.spacing(0, 1.5),
  },

  switchChip: {
    backgroundColor: theme.palette.background.default,
    fontSize: 16,
    cursor: 'pointer',

    flex: 1,
    justifyContent: 'flex-start',
    height: 80,
    padding: theme.spacing(1),
    width: '100%',
  },
}));
