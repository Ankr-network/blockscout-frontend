import { makeStyles } from '@material-ui/core/styles';

export const useLayoutStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'space-between',
    minWidth: 375,
    background: theme.palette.background.default,
  },

  mainAlignTop: {
    marginBottom: 'auto',
  },
}));
