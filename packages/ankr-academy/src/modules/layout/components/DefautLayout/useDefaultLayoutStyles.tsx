import { makeStyles, Theme } from '@material-ui/core/styles';

export const useDefaultLayoutStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'space-between',
    minWidth: 375,
    background: theme.palette.background.default,
  },

  main: {
    padding: theme.spacing(10, 0),
  },

  mainAlignTop: {
    marginBottom: 'auto',
  },
}));
