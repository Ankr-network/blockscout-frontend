import { makeStyles, Theme } from '@material-ui/core/styles';

import { mainTheme } from 'modules/themes/mainTheme';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    minWidth: 375,

    background: theme.palette.background.default,
  },

  darkTheme: {},

  body: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: mainTheme.palette.background.paper,
  },

  main: {
    flexGrow: 1,
    padding: theme.spacing(0, 3.5),
  },
}));
