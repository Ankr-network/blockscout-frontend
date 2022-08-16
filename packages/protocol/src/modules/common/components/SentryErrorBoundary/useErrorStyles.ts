import { makeStyles, Theme } from '@material-ui/core';

export const useErrorStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 52,
    marginBottom: theme.spacing(2),
  },
  description: {
    fontSize: 20,
    marginBottom: theme.spacing(3.5),
  },
}));
