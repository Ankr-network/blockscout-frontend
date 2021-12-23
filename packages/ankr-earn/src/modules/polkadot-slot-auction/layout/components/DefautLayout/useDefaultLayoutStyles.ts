import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useDefaultLayoutStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: 375,
    minHeight: '100vh',
    background: theme.palette.background.default,
  },

  darkTheme: {},

  main: {
    marginBottom: 'auto',
  },

  buttonArea: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: theme.spacing(0, 0, 0, 3),
  },
  button: {
    '&:active': {
      transform: 'none',
    },
  },
}));
