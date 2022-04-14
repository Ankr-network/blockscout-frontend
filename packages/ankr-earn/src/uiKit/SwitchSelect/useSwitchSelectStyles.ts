import { makeStyles } from '@material-ui/core';

export const useSwitchSelectStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },

  selectContainer: {
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: 290,
    },

    '& label': {
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
      fontWeight: 'normal',
    },
  },

  select: {
    backgroundColor: theme.palette.background.default,
    border: 'none !important',
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

  chipLabelContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  chipLabel: {
    whiteSpace: 'normal',
  },

  direction: {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',

    display: 'block',
  },

  switchIcon: {
    borderRadius: 12,

    margin: theme.spacing(1.5),
  },

  switchChip: {
    backgroundColor: theme.palette.background.default,
    fontSize: 16,
    cursor: 'pointer',

    flex: 1,
    justifyContent: 'flex-start',
    height: 80,
    padding: 0,
    width: '100%',

    '& svg': {
      marginLeft: 0,
    },
  },
}));
