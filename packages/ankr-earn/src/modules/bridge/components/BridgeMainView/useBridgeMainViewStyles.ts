import { makeStyles, Theme } from '@material-ui/core';

export const useBridgeMainViewStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(6, 6),
  },
  title: {
    textAlign: 'center',
    fontSize: 30,

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(7.5),
    },
  },
  tokenSelectWrapper: {
    maxWidth: '200px',
  },
  tokenInput: {
    background: theme.palette.background.default,
    '&:hover': {
      background: theme.palette.background.default,
    },
    '&:after, &:before': {
      borderBottom: '0px !important',
    },
    '& input': {
      textAlign: 'right',
    },
  },
  tokenField: {
    padding: theme.spacing(1),
    borderRadius: '9px',
    display: 'grid',
    gridTemplateColumns: '1fr auto auto',
    alignItems: 'center',
    background: theme.palette.background.default,
  },
  maxBtn: {
    background: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
    marginLeft: theme.spacing(1),
    minWidth: 41,
  },
  balance: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(2, 0, 4),
  },
  swapFields: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
  },
  swapField: {},
  swapBtn: {
    margin: theme.spacing(2),
    cursor: 'pointer',
    width: '36px',
    height: '36px',
    '&:hover rect': {
      fill: theme.palette.background.default,
    },
  },
  submitBtn: {
    width: '100%',
    height: 54,
    marginTop: theme.spacing(6),
  },
  anotherCheckbox: {
    margin: theme.spacing(2, 0),
    display: 'grid',
    flexDirection: 'column',
  },
  anotherAddress: {
    margin: theme.spacing(2, 0),
  },
}));
