import { makeStyles, Theme } from '@material-ui/core';

export const SIDEBAR_WIDTH = 220;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: SIDEBAR_WIDTH,
    minHeight: 785,
    padding: theme.spacing(4, 2),
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 40,
    padding: theme.spacing(0, 2),
    marginBottom: theme.spacing(5),
  },
  logo: {
    fontSize: 34,
    color: theme.palette.primary.main,
  },
  divider: {
    margin: theme.spacing(0, 2.3),
    backgroundColor: '#EBEDF2',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
}));
