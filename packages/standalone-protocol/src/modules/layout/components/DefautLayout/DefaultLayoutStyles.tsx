import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    minWidth: 375,
    fontVariantNumeric: 'tabular-nums',
    background: theme.palette.background.paper,
  },
  darkTheme: {},
  container: {
    flexGrow: 1,
  },
  body: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));
