import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: 220,
    padding: theme.spacing(4, 2),
    display: 'flex',
    flexDirection: 'column',
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
