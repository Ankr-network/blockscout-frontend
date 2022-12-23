import { makeStyles } from '@material-ui/core';

export const useMainSwitcherStyles = makeStyles(theme => ({
  root: {
    maxWidth: 740,
    margin: 'auto',
    padding: theme.spacing(5, 2),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 7),
    },
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: theme.spacing(0, 0, 4),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 3),
    },
  },

  info: {
    color: theme.palette.common.black,
    fontSize: 16,
    lineHeight: '20.8px',
    textAlign: 'center',

    margin: theme.spacing(0, 0, 4),
  },

  chips: {
    textAlign: 'center',
    margin: theme.spacing(0, 0, 5),
  },

  chip: {
    backgroundColor: 'transparent !important',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),

    '&:first-child': {
      marginRight: theme.spacing(1),
    },
  },

  infoIcon: {
    marginBottom: 2,
    marginRight: '8px !important',
    height: 15,
    width: 15,
  },

  amountInput: {
    height: 76,
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  hr: {
    backgroundColor: '#E0E6EF',
    height: 1,
    width: '100%',

    margin: theme.spacing(3, 0),
  },

  result: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  sum: {
    fontSize: 16,
  },

  buttons: {
    alignItems: 'center',
    display: 'flex',
    marginTop: theme.spacing(5),
  },

  button: {
    height: 60,
    flex: 1,

    '& + &': {
      marginLeft: theme.spacing(4),
    },
  },
}));
