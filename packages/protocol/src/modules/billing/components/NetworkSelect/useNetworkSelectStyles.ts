import { inputBaseClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useNetworkSelectStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
  },
  label: {
    color: theme.palette.grey[900],
    marginBottom: theme.spacing(2),
  },
  itemRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    width: '100%',
  },
  networkRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  networkIcon: {
    height: 24,
    width: 24,
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
      backgroundColor: theme.palette.background.default,

      [`.${inputBaseClasses.input}`]: {
        display: 'flex',
        paddingLeft: 0,
        paddingRight: theme.spacing(8),
      },
    },
  },
  inputRoot: {
    '&&&&': {
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
