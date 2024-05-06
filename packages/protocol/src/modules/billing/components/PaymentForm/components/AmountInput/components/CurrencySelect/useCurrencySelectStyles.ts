import { inputBaseClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useCurrencySelectStyles = makeStyles()(theme => ({
  formRoot: {
    width: 80,
  },
  itemRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    width: '100%',
  },
  currencyRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  currencyIcon: {
    marginRight: theme.spacing(2),
  },
  checkIcon: {
    color: theme.palette.primary.main,
  },
  select: {
    '&&': {
      color: theme.palette.text.primary,
    },
  },
  selectRoot: {
    '&&&': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      padding: 0,
      boxShadow: 'none',

      [`.${inputBaseClasses.input}`]: {
        display: 'flex',
        paddingLeft: 0,
        paddingRight: theme.spacing(8),
      },
    },
  },
  inputRoot: {
    '&&&': {
      paddingLeft: 0,
    },
  },
  menuItem: {
    padding: 0,
  },
  menuPaper: {
    width: 160,
    '&&': {
      transform: 'translateY(8px)',
    },
  },
}));
