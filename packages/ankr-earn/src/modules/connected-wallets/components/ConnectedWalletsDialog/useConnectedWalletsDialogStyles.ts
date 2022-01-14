import { makeStyles, Theme } from '@material-ui/core';

export const useConnectedWalletsDialogStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(5, 5, 0, 5),
  },
  wrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'start',
  },
  header: {
    fontSize: 30,
    marginBottom: theme.spacing(4.25),
    textAlign: 'left',
  },
  network: {
    marginBottom: theme.spacing(4.25),
    width: '100%',
  },
  button: {
    height: 24,
    padding: 0,
    alignSelf: 'center',
    marginBottom: theme.spacing(5),

    fontSize: 14,
    color: theme.palette.text.secondary,
    fontWeight: 500,
    transition: '0.2s color',

    marginRight: theme.spacing(1),

    '&:hover': {
      background: 'none',
      color: theme.palette.primary.main,
    },

    '&:last-of-type': {
      marginRight: 0,
    },
  },
  buttonText: {
    marginLeft: theme.spacing(0.5),
  },
}));
