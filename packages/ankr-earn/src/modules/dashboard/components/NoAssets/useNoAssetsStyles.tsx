import { makeStyles, Theme } from '@material-ui/core';

export const useNoAssetsStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2, 0, 6),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4, 0, 10),
    },
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),

    [theme.breakpoints.up('sm')]: {
      fontSize: 30,
    },
  },
  button: {
    width: 170,
    height: theme.spacing(5),
    borderRadius: theme.spacing(2),
  },
}));
